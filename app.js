const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

var team = []

inquirer
const questions = [
        {
            type: 'list',
            name: 'employeeType',
            message: 'What is your role?',
            choices: ['Manager','Engineer','Intern']
        },
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?',
            validate: function(value) {
                if (value != ''){
                  return true;
                };
                return 'Please enter at least one character';
              },
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is your ID number?',
            validate: function(value) {
                var valid = !isNaN(parseFloat(value));
                return valid || 'Please enter a number';
              },
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter your email address',
            validate: function(value) {
                var pass = value.match(
                /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
                );
                if (pass) {
                  return true;
                }
          
                return 'Please enter a valid email address';
              }
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: 'Enter your office number',
            validate: function(value) {
                var pass = value.match(
                  /^([01]{1})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i
                );
                if (pass) {
                  return true;
                }
          
                return 'Please enter a valid 10 digit phone number';
              },
            when: (answers)=> {
                if (answers.employeeType == 'Manager'){
                    return true
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub account.',
            when: (answers)=> {
                if (answers.employeeType == 'Engineer'){
                    return true
                }
            },
            validate: function(value) {
                if (value != ''){
                  return true;
                };
                return 'Please enter at least one character';
              },
        },
        {
            type: 'input',
            name: 'school',
            message: 'Enter your School.',
            when: (answers)=> {
                if (answers.employeeType == 'Intern'){
                    return true
                }
            },
            validate: function(value) {
                if (value != ''){
                  return true;
                };
                return 'Please enter at least one character';
              },
        },
        {
            type: 'confirm',
            name: 'continue',
            message: 'Would you like to enter another team member.',
        }

    ]
function getData(){
   inquirer.prompt(questions).then(answers=>{
       
        if (answers.employeeType == 'Manager'){
            const manager = new Manager(answers.name, answers.id, answers.email,answers.officeNumber)
            team.push(manager) 
        } else if (answers.employeeType == 'Engineer'){
            const employee = new Engineer(answers.name, answers.id, answers.email,answers.github)
            team.push(employee)
        } else if (answers.employeeType == 'Intern'){
            const intern = new Intern(answers.name, answers.id, answers.email,answers.school)
            team.push(intern)
        }
        if (answers.continue){
            getData()
        } else {
            writeTeam()
        }
    })

    .catch(error => {
        if(error){
            console.log(error)
        }
    })
}
getData()
function writeTeam(){
    fs.writeFileSync(outputPath,render(team),'utf-8')   
}

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
