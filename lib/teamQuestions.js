// employee questions
const roleQuestions = [
    {
        type: 'rawlist',
        name: 'empRole',
        message: 'Select the employee\'s role to get started. If your team is complete, select Done',
        choices: [
            'Manager',
            'Engineer',
            'Intern',
            'Done'
        ]
    }
];

const employeeQuestions = [
    {
        type: 'input',
        name: 'empName',
        message: 'Enter the employee\'s name.'
    },
    {
        type: 'input',
        name: 'empId',
        message: 'Enter the employee\'s ID.'
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