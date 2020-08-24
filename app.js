// require project modules
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const teamQuestions = require("./lib/teamQuestions");
const { roleQuestions, employeeQuestions, managerQuestions, engineerQuestions, internQuestions } = require("./lib/teamQuestions");

// npm packages
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// initialize empty array to store employees
let employees = [];
/*
// Prompst user with questions about employees
let promptUser = () => {
    let employee = {};
    return inquirer.prompt('roleQuestions').then((answer) => {
        employee['empRole'] = answer.empRole;
        inquirer.prompt(employeeQuestions).then((answer) => {
            employee['empName'] = answer.empName;
            employee['empID'] = answer.empID;
            employee['empEmail'] = answer.empEmail;
            if (employee['empRole'] === 'Manager') {
                inquirer.prompt(managerQuestions).then((answer) => {
                    employee['mgrOfficeNumber'] = answer.mgrOfficeNumber;
                    startQuestions();
                });
            }
            else if (employee['empRole'] === 'Done') {
                console.log('Done with team members!');
                console.log(employee);
            }
        });
    });
}*/

let promptUser = () => {
    // name, id, email, custom
    let employee = {};
    // first ask for a role
    return inquirer.prompt(roleQuestions).then((answer) => {
        // save role to employee object
        employee['empRole'] = answer.empRole;
        //console.log(answer.empRole);
        if (answer.empRole === 'Done') {
            console.log(`Your team is complete.`);
            console.log(employees);
            return employees;
        } else {
            // then ask general employee questions
            return inquirer.prompt(employeeQuestions).then((answer) => {
                // save general answers to employee object
                employee['empName'] = answer.empName;
                employee['empId'] = answer.empId;
                employee['empEmail'] = answer.empEmail;
                // if the role was manager, ask manager specific question
                if (employee['empRole'] === 'Manager') {
                    return inquirer.prompt(managerQuestions).then((answer) => {
                        // save manager answer to employee object
                        employee['mgrOfficeNumber'] = answer.mgrOfficeNumber;
                        // create new Manager construct
                        const addEmployee = new Manager(employee['empName'], employee['empId'], employee['empEmail'], employee['mgrOfficeNumber']);
                        // add Manager construct to employees array
                        employees.push(addEmployee);
                        // prompt first question again
                        promptUser();
                    });
                    // if the role was engineer, ask engineer specific question
                } else if (employee['empRole'] === 'Engineer') {
                    return inquirer.prompt(engineerQuestions).then((answer) => {
                        // save engineer answer to employee object
                        employee['engGithub'] = answer.engGithub;
                        // create new Engineer construct
                        const addEmployee = new Engineer(employee['empName'], employee['empId'], employee['empEmail'], employee['engGithub']);
                        // add Engineer construct to employees array
                        employees.push(addEmployee);
                        // prompt first question again
                        promptUser();
                    });
                    // if the role was intern, ask intern specific question
                } else if (employee['empRole'] === 'Intern') {
                    return inquirer.prompt(internQuestions).then((answer) => {
                        // save intern answer to employee object
                        employee['internSchool'] = answer.internSchool;
                        // create new Intern construct
                        const addEmployee = new Intern(employee['empName'], employee['empId'], employee['empEmail'], employee['internSchool']);
                        // add Intern construct to employees array
                        employees.push(addEmployee);
                        // prompt first question again
                        promptUser();
                    });
                }
            });
        }
    });
}

// function to write team.html file
const writeToFile = util.promisify(fs.writeFile);

const init = async () => {
    console.log("Welcome to the Team HTML Page Generator! You will be guided through a series of questions to create profiles for your employees. If you don't have an answer right now, you can leave it blank. At the end, you will have a team.html file in the Output folder.");
    try {
        // Get user answers
        //const answers = await promptUser();
        await promptUser();
        //await promptUser();
        //console.log('something here');
        //console.log(employees);
        //console.log(employees);
        const employeeHTML = render(employees);

        await writeToFile(outputPath, employeeHTML);

        //console.log("Successfully created /output/team.html");
    } catch (err) {
        console.log(err);
    }
}

init();



// NOTES from assignment......
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
