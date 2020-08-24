// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Engineer extends Employee {
    constructor(name,id,email,github) {
        const role = 'Engineer';
        super(name,id,email,role);
        this.github = github;
    }
    getRole() {
        return this.role;
    }
    getGithub() {
        return this.github;
    }
}

module.exports = Engineer;

// Test Results
// Ran:  npm test Engineer.test.js
// All tests passed 8/23/2020
// Re-ran after adding role
// All test passed 8/24/20