// role questions
const roleQuestions = [
    {
        type: 'list',
        name: 'empRole',
        message: 'Select the employee\'s role to get started with creating an employee profile. If your team is complete, select Done.',
        choices: [
            'Manager',
            'Engineer',
            'Intern',
            'Done'
        ]
    }
];

// questions about all employees 
const employeeQuestions = [
    {
        type: 'input',
        name: 'empName',
        message: 'Enter the employee\'s name.',
        //capitalize first letters of name - name.replace from https://www.w3resource.com/javascript-exercises/javascript-string-exercise-9.php
        filter: function (name) {
            return name.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
        }
        // validate: function (answer,array) {
        //     if (array.find(item => item.name === answer.empName)) {
        //         return 'Looks like you may have already returned this name.';
        //     }

        //     return true;
        // }
    },
    {
        type: 'input',
        name: 'empId',
        message: 'Enter the employee\'s ID.'
    },
    {
        type: 'input',
        name: 'empEmail',
        message: 'Enter the employee\'s e-mail address.',
        // validate email address format - reg exp from https://www.codespot.org/javascript-email-validation/
        validate: function (email) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!re.test(email.toLowerCase())) {
                return 'You entered an invalid e-mail address.';
            }
            return true;
        }
    }
];

// questions about manager
const managerQuestions = [
    {
        type: 'input',
        name: 'mgrOfficeNumber',
        message: 'Enter the manager\'s office number.'
    }
];
// questions about engineers
const engineerQuestions = [
    {
        type: 'input',
        name: 'engGithub',
        message: 'Enter the engineer\'s GitHub username.'
    }
]

// questions about interns
const internQuestions = [
    {
        type: 'input',
        name: 'internSchool',
        message: 'Enter the intern\'s school.'
    }
];

module.exports = { roleQuestions, employeeQuestions, managerQuestions, engineerQuestions, internQuestions };