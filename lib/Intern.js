// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Intern extends Employee {
    constructor(name,id,email,school) {
        const role = 'Intern';
        super(name,id,email,role);
        this.school = school;
    }
    getRole() {
        return this.role;
    }
    getSchool() {
        return this.school;
    }
}

module.exports = Intern;

// Test Results
// Ran:  npm test Intern.test.js
// All tests passed 8/23/2020
// Re-ran after adding role
// All test passed 8/24/20