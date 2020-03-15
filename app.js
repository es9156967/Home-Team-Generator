//All required Node packages
const inquirer = require("inquirer");
const jest = require("jest");
const util = require("util");
const fs = require("fs");

//These are all the classes (and subclasses) needed. Located in the 'lib' folder.
const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

//Setting these up early. The ID will be counting up on it's own. The other three are empty arrays I will use to store instances of classes.
var ID = 0;
const Managers = [];
const Engineers = [];
const Interns = [];

//Lines 20-37 are making the HTML file, but for now it's just an empty shell.
const basehtml =`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" 
    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <title>Team Profile Generator</title>
</head>
<body style="background-color: darkgrey;">
    <h1 class="col-12 py-4 display-4 text-center my-4" style= "background-color:black; color: white";>My Team</h1>
    <div class="row px-5 mx-5 justify-content-center">    
    `;
fs.writeFile('index.html', basehtml, (err) => {
    if (err) throw err;
  });


//This function collects user imputs and adds employee instances to previously mentioned arrays.
var promptForBasicInfo = function () {
    inquirer.prompt(
        [
            {
                message: "Please enter employee name:",
                name: "employeeName"
            },
            {
                type: "list",
                message: "Please choose employee position:",
                choices: ['Manager', 'Engineer', 'Intern'],
                name: "position"
            },
            {
                message: "Please enter employee email:",
                name: "email"
            },
            {
                message: "Please enter office number:",
                name: "officeNumber",
                when: (answers) => answers.position === 'Manager'
            },
            {
                message: "Please enter github profile name:",
                name: "github",
                when: (answers) => answers.position === 'Engineer'
            },
            {
                message: "Please enter school name:",
                name: "schoolName",
                when: (answers) => answers.position === 'Intern'
            },
        ]
    ).then(
        function(answers)
        {
            ID++;
            if (answers.position === 'Manager') {
                var manager = new Manager(ID, answers.employeeName, answers.email, answers.officeNumber);
                Managers.push(manager);
                console.log("Added new manager to employees.");
                closingprompts();
            }
            if (answers.position === 'Engineer') {
                var engineer = new Engineer(ID, answers.employeeName, answers.email, answers.github);
                Engineers.push(engineer);
                console.log("Added new engineer to employees.");
                closingprompts();
            }
            if (answers.position === 'Intern') {
                var intern = new Intern(ID, answers.employeeName, answers.email, answers.schoolName);
                Interns.push(intern);
                console.log("Added new intern to employees.");
                closingprompts();
            }
        }
    );
}
promptForBasicInfo();

//This function either loops the previous function or ends user inputs and appends HTML to the base document created earlier.
function closingprompts() {
    inquirer.prompt(
        [
            {
                type: "list",
                message: "Enter additional employees?:",
                choices: ['Yes', 'No'],
                name: "continue"
            },
        ]
    ).then(function(answers) {
        if (answers.continue === "Yes") {
            promptForBasicInfo(); 
        }
        else {
            for (i = 0; i < Managers.length; i++) {
                var newcard = `
                <div class="card col-3 mx-3 my-3" style="width: 18rem;">
                    <div class="card-body" style= "background-color:black; color: white">
                        <h5 class="card-title text-center">${Managers[i].name}</h5>
                        <p class="card-text text-center">${Managers[i].position}</p>
                </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">ID: ${Managers[i].ID}</li>
                        <li class="list-group-item">EMAIL: ${Managers[i].email}</li>
                        <li class="list-group-item">OFFICE NUMBER: ${Managers[i].officenum}</li>
                    </ul>
                </div>`
                fs.appendFile('index.html', newcard, (err) => {
                    if (err) throw err;
                    console.log('Manager card was appended to html document.');
                  });
            }
            for (i = 0; i < Engineers.length; i++) {
                var newcard = `
                <div class="card col-3 mx-3 my-3" style="width: 18rem;">
                    <div class="card-body" style= "background-color:black; color: white">
                        <h5 class="card-title text-center">${Engineers[i].name}</h5>
                        <p class="card-text text-center">${Engineers[i].position}</p>
                </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">ID: ${Engineers[i].ID}</li>
                        <li class="list-group-item">EMAIL: ${Engineers[i].email}</li>
                        <li class="list-group-item">GITHUB PROFILE: ${Engineers[i].github}</li>
                    </ul>
                </div>`
                fs.appendFile('index.html', newcard, (err) => {
                    if (err) throw err;
                    console.log('Engineer card was appended to html document.');
                  });
            }
            for (i = 0; i < Interns.length; i++) {
                var newcard = `
                <div class="card col-3 mx-3 my-3" style="width: 18rem;">
                    <div class="card-body" style= "background-color:black; color: white">
                        <h5 class="card-title text-center">${Interns[i].name}</h5>
                        <p class="card-text text-center">${Interns[i].position}</p>
                </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">ID: ${Interns[i].ID}</li>
                        <li class="list-group-item">EMAIL: ${Interns[i].email}</li>
                        <li class="list-group-item">SCHOOL: ${Interns[i].school}</li>
                    </ul>
                </div>`
                fs.appendFile('index.html', newcard, (err) => {
                    if (err) throw err;
                    console.log('Intern card was appended to html document.');
                  });
            }
            var htmlend = `</div>  
            </body>
            </html>`
            fs.appendFile('index.html', htmlend, (err) => {
                if (err) throw err;
                console.log("Empolyee submissions entered. HTML document complete.")
              });
        }
    });
};