// Program wall behavior: index tracking with counter, quiet reveal,
// station spotlight, accordion. No parallax, no progress chrome —
// the grid stays still.
document.documentElement.classList.add("js-accordion");

var SECTION_ORDER = ["summary", "experience", "military", "skills", "credentials", "education"];

function initSectionTracking() {
  var navLinks = document.querySelectorAll(".section-index a");
  var counter = document.getElementById("counter-now");
  if (!navLinks.length) return;

  var sections = SECTION_ORDER.map(function (id) {
    return document.getElementById(id);
  }).filter(Boolean);

  var range = document.querySelector(".range");
  var rangeYear = document.getElementById("range-year");
  // animation-timeline owns the marker where it exists; JS covers every other
  // engine so the marker and the year can never drift apart.
  var cssScrub = !!(window.CSS && window.CSS.supports && window.CSS.supports("animation-timeline: scroll()"));

  var setActive = function (id) {
    navLinks.forEach(function (link) {
      var isActive = link.getAttribute("href") === "#" + id;
      link.classList.toggle("active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
    if (counter) {
      var idx = SECTION_ORDER.indexOf(id);
      counter.textContent = "0" + (idx >= 0 ? idx + 1 : 1);
    }
  };

  // Position, not intersection ratios: a section taller than the tracking band
  // can never satisfy a threshold, which is how the counter used to lie.
  // One reading line at 35% of the viewport. The main column wins ties, so the
  // rail only reports when no main section is holding the line.
  var currentId = null;
  // A clicked or deep-linked section stays active while it is on screen, so a
  // short section that cannot scroll to the reading line (Military, Education
  // near the page end) still reports itself. Released once it leaves view.
  var pinnedId = SECTION_ORDER.indexOf(location.hash.slice(1)) >= 0 ? location.hash.slice(1) : null;
  var pinSeen = false;
  var pin = function (id) {
    if (SECTION_ORDER.indexOf(id) < 0) return;
    pinnedId = id;
    pinSeen = false;
    // A target already on screen produces no scroll event; re-pick now.
    schedule();
  };
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      pin(link.getAttribute("href").slice(1));
    });
  });
  window.addEventListener("hashchange", function () {
    pin(location.hash.slice(1));
  });

  var onScreen = function (el) {
    var r = el.getBoundingClientRect();
    return r.top < window.innerHeight && r.bottom > 0;
  };

  var pick = function () {
    var id = null;

    if (pinnedId) {
      var pinned = document.getElementById(pinnedId);
      if (pinned && onScreen(pinned)) {
        pinSeen = true;
        id = pinnedId;
      } else if (pinned && !pinSeen) {
        id = pinnedId; // still travelling toward it
      } else {
        pinnedId = null;
      }
    }

    var atEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
    if (!id && atEnd) {
      // The last sections can never reach the reading line; at the page end
      // report the furthest section the visitor can see. Pick the one lowest
      // on screen, not the last in SECTION_ORDER — the rail sits beside the
      // record, so its sections scroll past long before the page ends.
      var furthest = null;
      sections.forEach(function (el) {
        if (!onScreen(el)) return;
        if (!furthest || el.getBoundingClientRect().top > furthest.getBoundingClientRect().top) {
          furthest = el;
        }
      });
      if (furthest) id = furthest.id;
    }

    if (!id) {
      var line = window.innerHeight * 0.35;
      var mainAtLine = null;
      var railAtLine = null;
      var mainAbove = null;
      var railAbove = null;

      sections.forEach(function (el) {
        var rect = el.getBoundingClientRect();
        var inMain = el.closest("main") !== null;
        if (rect.top <= line && rect.bottom > line) {
          if (inMain) mainAtLine = el.id;
          else railAtLine = el.id;
        } else if (rect.top <= line) {
          if (inMain) mainAbove = el.id;
          else railAbove = el.id;
        }
      });

      // The main column is the record; the rail is a side column whose
      // sections scroll past early. Prefer the main column so the counter
      // never flickers to the rail in the gaps between record sections.
      id = mainAtLine || mainAbove || railAtLine || railAbove || SECTION_ORDER[0];
    }

    if (id !== currentId) {
      currentId = id;
      setActive(id);
    }

    if (range) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var scrolled = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      // The record runs newest-first, so the top of the page is 2026.
      var progress = 1 - scrolled;
      if (!cssScrub) {
        range.style.setProperty("--progress", progress.toFixed(4));
      }
      if (rangeYear) {
        rangeYear.textContent = String(2019 + Math.round(progress * 7));
      }
    }
  };

  var ticking = false;
  var schedule = function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      ticking = false;
      pick();
    });
  };

  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  window.addEventListener("load", schedule);
  if ("ResizeObserver" in window) {
    new ResizeObserver(schedule).observe(document.body);
  }
  pick();
}

function initScrollReveal() {
  // The inline <head> script owns the js-scrollreveal opt-in and a timed
  // fallback that shows everything. data-reveal-ready is the handoff: it is
  // set only after observation is fully wired, so any earlier failure (or a
  // missing IntersectionObserver) leaves the fallback to reveal the page.
  if (!("IntersectionObserver" in window)) return;

  var LEAD = 80;
  var targets = Array.prototype.slice.call(
    document.querySelectorAll(".block, .station")
  );

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0, rootMargin: "0px 0px " + LEAD + "px 0px" }
  );

  // Read every rect first, then write: no layout thrash. Anything already
  // inside the observer's zone is shown in this same task so it never paints
  // hidden; the rest is handed to the observer.
  var limit = window.innerHeight + LEAD;
  var rects = targets.map(function (el) {
    return el.getBoundingClientRect();
  });
  targets.forEach(function (el, i) {
    var rect = rects[i];
    if (rect.height && rect.top <= limit && rect.bottom >= 0) {
      el.classList.add("is-visible");
    } else {
      observer.observe(el);
    }
  });

  document.documentElement.setAttribute("data-reveal-ready", "");
}

function initStationSpotlight() {
  var stations = document.querySelectorAll("#jobbox .station");
  if (!stations.length || !("IntersectionObserver" in window)) return;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          stations.forEach(function (station) {
            station.classList.remove("is-inview");
          });
          entry.target.classList.add("is-inview");
        }
      });
    },
    { rootMargin: "-35% 0px -45% 0px", threshold: 0.15 }
  );

  stations.forEach(function (station) {
    observer.observe(station);
  });
}

function initAccordions() {
  var jobbox = document.getElementById("jobbox");
  if (!jobbox) return;
  var jobs = jobbox.querySelectorAll(".job");
  if (!jobs.length) return;

  jobs.forEach(function (wrapper, index) {
    var header = wrapper.querySelector(".jobheader");
    var body = wrapper.querySelector(".jobbody");
    if (!header || !body) return;

    var expand = function () {
      body.classList.add("open");
      header.setAttribute("aria-expanded", "true");
      body.setAttribute("aria-hidden", "false");
      body.removeAttribute("inert");
    };
    var collapse = function () {
      body.classList.remove("open");
      header.setAttribute("aria-expanded", "false");
      body.setAttribute("aria-hidden", "true");
      body.setAttribute("inert", "");
    };
    var toggle = function () {
      var isOpen = header.getAttribute("aria-expanded") === "true";
      if (isOpen) {
        collapse();
      } else {
        expand();
      }
    };
    header.addEventListener("click", toggle);

    if (index !== 0) {
      header.setAttribute("aria-expanded", "false");
      body.setAttribute("aria-hidden", "true");
      body.setAttribute("inert", "");
    }
  });
}

function initCopyEmail() {
  document.querySelectorAll("[data-copy-email]").forEach(function (btn) {
    var address = btn.getAttribute("data-copy-email");
    var restLabel = btn.textContent;
    var status = btn.parentElement.querySelector("[data-copy-status]");
    var reset = null;
    var done = function () {
      btn.textContent = "Copied";
      if (status) status.textContent = address + " copied to clipboard";
      window.clearTimeout(reset);
      reset = window.setTimeout(function () {
        btn.textContent = restLabel;
        if (status) status.textContent = "";
      }, 2200);
    };
    var legacyCopy = function () {
      var ta = document.createElement("textarea");
      ta.value = address;
      ta.setAttribute("readonly", "");
      ta.style.position = "absolute";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        done();
      } catch (err) {
        /* clipboard blocked — the address is still visible on the page */
      }
      document.body.removeChild(ta);
    };
    btn.addEventListener("click", function () {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(address).then(done, legacyCopy);
      } else {
        legacyCopy();
      }
    });
  });
}

function initA11yFixes() {
  document.querySelectorAll(".sep").forEach(function (el) {
    el.setAttribute("aria-hidden", "true");
  });

  document.querySelectorAll("img").forEach(function (img) {
    img.addEventListener("error", function () {
      img.style.display = "none";
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  // First: a throw in any later init must not strand hidden reveal targets.
  initScrollReveal();
  initSectionTracking();
  initStationSpotlight();
  initAccordions();
  initCopyEmail();
  initA11yFixes();
});
