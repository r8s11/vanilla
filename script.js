import data from './jobs.json' assert {
    type: "json"
}



let jobs = document.getElementById("jobList")
let jobList = data.jobs
let skilllist = data.skills
for (let x in skilllist) {

}



for (let x in jobList) {

    let tools = jobList[x].tools
    let tool = []
    for( let i in tools){
           tool += "<ol>" + tools[i] + "</ol> "
    }
   
    
    jobs.innerHTML += `<div class="job">
    <h4 class="desc">
    ` + jobList[x].title + `
      <br />
      ` + jobList[x].company + `
      <br />
      ` + jobList[x].location + `
      <br />
      ` + jobList[x].duration + `
    </h4>
    <p>
    <h4>Description</h4>

    </p>
    <div class="tools">
      <h4>Tools</h4>        
      ${tool}
    </div>
  </div>
  `

}
console.log()