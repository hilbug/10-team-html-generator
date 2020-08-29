// require project modules
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const { roleQuestions, employeeQuestions, managerQuestions, engineerQuestions, internQuestions } = require("./lib/teamQuestions");
const mappedNames = require('./lib/mappedNames');
const render = require("./lib/htmlRenderer");

// npm packages
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs");
const util = require("util");

// output paths
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// initialize empty array to store employees
let employees = [];

let promptUser = () => {
    // name, id, email, custom
    let employee = {};
    // first ask for a role
    return inquirer.prompt(roleQuestions).then((answer) => {
        // save role to employee object
        employee['empRole'] = answer.empRole;
        // if they are done creating the team, return employees array
        if (answer.empRole === 'Done') {
            console.log(`Your team is complete.`);
            console.log(employees);
            return employees;
        // otherwise, continue on with the other questions
        } else {
            // then ask general employee questions
            return inquirer.prompt(employeeQuestions).then((answer) => {
                // save general answers to objects for employee and name validation
                mappedNames.mappedNames.push(answer.empName);
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
                        return promptUser();
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
                        return promptUser();
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
                        // prompt first question again until "Done"
                        return promptUser();
                    });
                }
            });
        }
    });
}

// function to write team.html file
const writeToFile = util.promisify(fs.writeFile);

// check if output folder exists and create one if it doesn't
const checkDir = () => {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fsPromises.mkdir(OUTPUT_DIR, (err) => {if (err) throw err});
    }
}

// function to initiate program
const init = async () => {
    console.log("Welcome to the Team HTML Page Generator! You will be guided through a series of questions to create profiles for your employees. If you don't have an answer right now, you can leave it blank by hitting enter. At the end, you will have a team.html file in the Output folder.");
    try {
        // make directory if it doesn't exist
        checkDir();

        // Get user answers
        await promptUser();

        // Write employees to HTML
        const employeeHTML = render(employees);

        // Save HTML to teams.html
        await writeToFile(outputPath, employeeHTML);

        // File successful
        console.log("Successfully created /output/team.html");
    } catch (err) {
        console.log(err);
    }
}

// Initialize program
init();
