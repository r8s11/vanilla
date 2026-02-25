import data from "./jobs.json" with { type: "json" };

function initScrollReveal() {
  document.documentElement.classList.add("js-scrollreveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0 }
  );
  document.querySelectorAll(".content-block").forEach((el) => observer.observe(el));
}

document.addEventListener("DOMContentLoaded", () => {
  // Init scroll reveal early so hidden state is set before first paint
  initScrollReveal();

  const jobbox = document.getElementById("jobbox");
  const skillbox = document.getElementById("skillbox");
  const joblist = data?.jobs ?? [];
  const skilllist = data?.skills ?? [];

  // ── Skills: single batch write ──────────────────────
  if (skillbox && skilllist.length) {
    const frag = document.createDocumentFragment();
    skilllist.forEach((s) => {
      const li = document.createElement("li");
      li.textContent = s;
      frag.appendChild(li);
    });
    skillbox.appendChild(frag);
  }

  // ── Jobs: DOM-built, proper <button> header ──────────
  if (jobbox && joblist.length) {
    const frag = document.createDocumentFragment();

    joblist.forEach((job, index) => {
      const wrapper = document.createElement("div");
      wrapper.className = "job";
      wrapper.style.setProperty("--stagger-delay", `${index * 0.07}s`);

      // header button
      const header = document.createElement("button");
      header.className = "jobheader";
      header.type = "button";
      header.setAttribute("aria-expanded", "false");

      const logo = document.createElement("img");
      logo.src = job.logo || "";
      logo.alt = `${job.company || "Company"} logo`;
      logo.width = 48;
      logo.height = 48;
      logo.loading = "lazy";

      const titleGroup = document.createElement("div");
      titleGroup.className = "job-title-group";
      const titleEl = document.createElement("h4");
      titleEl.textContent = job.title || "";
      const metaEl = document.createElement("div");
      metaEl.className = "job-meta";
      const company = document.createElement("span");
      company.className = "company";
      company.textContent = job.company || "";
      const sep1 = document.createElement("span");
      sep1.className = "sep";
      sep1.textContent = "·";
      const location = document.createElement("span");
      location.className = "location";
      location.textContent = job.location || "";
      const sep2 = document.createElement("span");
      sep2.className = "sep";
      sep2.textContent = "·";
      const duration = document.createElement("span");
      duration.className = "duration";
      duration.textContent = job.duration || "";
      metaEl.append(company, sep1, location, sep2, duration);
      titleGroup.append(titleEl, metaEl);

      const chevron = document.createElement("div");
      chevron.className = "toggle-chevron";
      chevron.innerHTML = "&#x25BE;";
      chevron.setAttribute("aria-hidden", "true");

      header.append(logo, titleGroup, chevron);

      // body
      const body = document.createElement("div");
      body.className = "jobbody";
      body.setAttribute("aria-hidden", "true");

      const content = document.createElement("div");
      content.className = "jobcontent";

      const desc = document.createElement("div");
      desc.className = "desc";
      const descH = document.createElement("h4");
      descH.textContent = "Description";
      const descP = document.createElement("p");
      descP.textContent = job.description || "";
      desc.append(descH, descP);

      const tools = document.createElement("div");
      tools.className = "tools";
      const toolsH = document.createElement("h4");
      toolsH.textContent = "Tech";
      const toolsUl = document.createElement("ul");
      (job.tools || []).forEach((t) => {
        const li = document.createElement("li");
        li.textContent = t;
        toolsUl.appendChild(li);
      });
      tools.append(toolsH, toolsUl);

      content.append(desc, tools);
      body.appendChild(content);

      // toggle
      const expand = () => {
        body.style.maxHeight = body.scrollHeight + "px";
        header.setAttribute("aria-expanded", "true");
        body.setAttribute("aria-hidden", "false");
      };
      const collapse = () => {
        if (body.style.maxHeight === "none")
          body.style.maxHeight = body.scrollHeight + "px";
        requestAnimationFrame(() => {
          body.style.maxHeight = "0";
        });
        header.setAttribute("aria-expanded", "false");
        body.setAttribute("aria-hidden", "true");
      };
      body.addEventListener("transitionend", (e) => {
        if (
          e.propertyName === "max-height" &&
          header.getAttribute("aria-expanded") === "true"
        )
          body.style.maxHeight = "none";
      });
      header.addEventListener("click", () => {
        header.getAttribute("aria-expanded") === "true" ? collapse() : expand();
      });
      header.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          header.click();
        }
      });

      wrapper.append(header, body);
      frag.appendChild(wrapper);

      if (index === 0) requestAnimationFrame(() => expand());
    });

    jobbox.appendChild(frag);
  }
});
