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
      jobs.innerHTML += `<div class="job">
        <div class="jobheader">
         <!-- <img src="" alt="" /> -->
          <h4>
            ${job.title}
            <br />
            ${job.company}
            <br />
            ${job.location}
            <br />
            ${job.duration}
          </h4>
        </div>
      </div>`;
    });
  }
});
