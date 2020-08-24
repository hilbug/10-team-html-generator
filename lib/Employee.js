// TODO: Write code to define and export the Employee class
class Employee {
    constructor(name,id,email,role) {
        this.name = name;
        this.id = id;
        this.email = email;
        this.role = role;
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
        return this.role = 'Employee';
    }
}

module.exports = Employee;

// Test Results
// Ran:  npm test Employee.test.js
// All tests passed 8/23/20
// Re-ran after adding role
// All test passed 8/24/20