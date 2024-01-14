import data from "./jobs.json" assert { type: "json" };

//selecting the HTML elemtent to insert the data
let jobs = document.getElementById("jobbox");
//select skills HTML element to inster skill list
let skills = document.getElementById("skillbox");
//It asbstract the job section of the json
let joblist = data.jobs;
//It abstract the skill section of the json
let skilllist = data.skills;
// for (let x in skilllist) {
console.log(skills);

console.log(skilllist);

skilllist.forEach((x) => {
  skills.innerHTML += `<li>${x}</li>`
}
  );

joblist.forEach((x) => {
  jobs.innerHTML += `<div class="job">
  <div class="jobheader">
   <!-- <img src="" alt="" /> -->
    <h4>
      ${x.title}
      <br />
      ${x.company}
      <br />
      ${x.location}
      <br />
      ${x.duration}
    </h4>
  </div>
<!-- <div class="desc">
      <h4>Description</h4>
      <p>
        ${x.description}
      </p>
    </div>
    <div class="tools">
      <h4>Tools</h4>
      <ul>
        <li>${x.tools}</li>
      </ul>
  </div> -->
</div>`;
});

// console.log(jobs);
