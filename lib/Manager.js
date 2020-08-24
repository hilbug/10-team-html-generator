// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Manager extends Employee {
    constructor(name,id,email,officeNumber) {
        const role = 'Manager'
        super(name,id,email,role);
        this.officeNumber = officeNumber;
    }
    getRole() {
        return this.role;
    }
    getOfficeNumber() {
        return this.officeNumber;
    }
}

module.exports = Manager;

// Test Results
// Ran:  npm test Manager.test.js
// All tests passed 8/23/2020
// Re-ran after adding role
// All test passed 8/24/20