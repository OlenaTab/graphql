// script.js
document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOMContentLoaded event listener");
  const mainDiv = document.getElementById("main");
  const chart = document.getElementById("bar-chart"); // Changed ID to "bar-chart"
  
  // get session ID from cookie
  const jwt = localStorage.getItem("jwt");
  
  // if there is no session ID, load the <log-in> custom element
  if (jwt == undefined) {
    chart.style.display = "none";
    const logInElement = document.createElement("log-in");
    mainDiv.appendChild(logInElement);
  } else {
    const homePageElement = document.createElement("home-page");
    mainDiv.appendChild(homePageElement);
    
    if (localStorage.getItem("skills") != undefined) {
      // Removed pie chart code
      const technicalSkills = getTechnicalSkills(JSON.parse(localStorage.getItem("skills")));
      
      const data = [
        {
          x: [], // Changed from 'labels' to 'x' for bar chart
          y: [], // Changed from 'values' to 'y' for bar chart
          type: 'bar',
          marker: {
            color: ['green', 'blue', 'red', 'pink', 'orange', 'purple', 'cyan'],
          }, 
        },
      ];
      
      technicalSkills.forEach((item) => {
        data[0].x.push(item.skill); // Use 'skill' for x-axis in the bar chart
        data[0].y.push(item.amount); // Use 'amount' for y-axis in the bar chart
      });
      
      console.log(data);
      
      var layout = {
        title: 'Technical Skills',
        xaxis: { title: 'Skills' }, // Add x-axis label
        yaxis: { title: 'Amount' }, // Add y-axis label
        height: 500,
        width: 700,
        plot_bgcolor: 'lightyellow', // Set the background color of the chart
        paper_bgcolor: 'rgba(0, 0, 0, 0)', // Set the background color of the chart
      };
      
      Plotly.newPlot('bar-chart', data, layout, { staticPlot: true });
    }
  }
});


function getTechnicalSkills(data) {
    const skills = [];
    data.forEach((skill) => {
      if (skill.type.startsWith("skill_")) {
        const existingSkill = skills.find(
          (s) => s.skill === skill.type.slice(6)
        );
        if (existingSkill) {
          existingSkill.amount += skill.amount;
        } else {
          skills.push({
            skill: skill.type.slice(6),
            amount: skill.amount,
          });
        }
      }
    });
    // Arrays to store the separated skills
    const technicalSkills = [];
    // Separate the skills into respective arrays
    skills.forEach(skill => {
      if (
        skill.skill === "prog" ||
        skill.skill === "tcp" ||
        skill.skill === "algo" ||
        skill.skill === "game" ||
        skill.skill === "back-end" ||
        skill.skill === "front-end" ||
        skill.skill === "sys-admin"
      ) {
        technicalSkills.push(skill);
      }
    });
    console.log("Technical Skills:", technicalSkills);
    return technicalSkills;

}