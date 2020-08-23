// TODO: Write code to define and export the Employee class
class Employee {
    constructor(name,id,email) {
        this.name = name;
        this.id = id;
        this.email = email;
    }
    getName()  {
        return this.name;
    }
    getId() {
        return this.id;
    }
    getEmail() {
        return this.email;
    }
    getRole() {
        return 'Employee';
    }
}

module.exports = Employee;

// Test Results
// Ran:  npm test Employee.test.js
// All tests passed 8/23/20