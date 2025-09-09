import data from "./jobs.json" with { type: "json" };

// Wait for DOM to be loaded
document.addEventListener('DOMContentLoaded', function() {
  //selecting the HTML element to insert the data
  let jobs = document.getElementById("jobbox");
  //select skills HTML element to insert skill list
  let skills = document.getElementById("skillbox");
  
  //It abstracts the job section of the json
  let joblist = data.jobs;
  //It abstracts the skill section of the json
  let skilllist = data.skills;

  console.log("Skills data:", skilllist);
  console.log("Skills element:", skills);

  // Populate skills
  if (skilllist && skills) {
    skilllist.forEach((skill) => {
      skills.innerHTML += `<li>${skill}</li>`;
    });
  }

  // Populate jobs
  if (joblist && jobs) {
    joblist.forEach((job) => {
      const wrapper = document.createElement("div");
      wrapper.className = "job";
      wrapper.innerHTML = `
        <div class="jobheader" role="button" tabindex="0" aria-expanded="false" >
          <img src="${job.logo}" alt="" />
          <h4>
        ${job.title}<br />
        ${job.company}<br />
        ${job.location}<br />
        ${job.duration}
          </h4>
        </div>
        <div class="jobbody" aria-hidden="true">
         <div class="jobcontent">
          <div class="desc">
            <h4>Description</h4>
            <p>${job.description}</p>
          </div>
          <div class="tools">
            <h4>Tools</h4>
            <ul>
              ${job.tools.map(tool => `<li>${tool}</li>`).join("")}
            </ul>
          </div>
          </div>
        </div>
      `;
      const header = wrapper.querySelector(".jobheader");
      const body = wrapper.querySelector(".jobbody");

      // Slide setup
      body.style.overflow = "hidden";
      body.style.maxHeight = "0";
      body.style.transition = "max-height 400ms ease";

      const expand = () => {
        body.style.maxHeight = body.scrollHeight + "px";
        header.setAttribute("aria-expanded", "true");
        body.setAttribute("aria-hidden", "false");
      };

      const collapse = () => {
        if (body.style.maxHeight === "none") {
          body.style.maxHeight = body.scrollHeight + "px";
          body.offsetHeight; // force reflow
        }
        body.style.maxHeight = "0";
        header.setAttribute("aria-expanded", "false");
        body.setAttribute("aria-hidden", "true");
      };

      body.addEventListener("transitionend", (e) => {
        if (e.propertyName === "max-height" && header.getAttribute("aria-expanded") === "true") {
          body.style.maxHeight = "none"; // allow dynamic height after opening
        }
      });

      const toggle = () => {
        const expanded = header.getAttribute("aria-expanded") === "true";
        expanded ? collapse() : (body.style.maxHeight = "0", body.offsetHeight, expand());
      };

      header.addEventListener("click", toggle);
      header.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      });

      jobs.appendChild(wrapper);
    });
  }
});
