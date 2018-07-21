const Employee = require('./employee');

class Admin extends Employee {
    constructor(username, password) {
      super('admin', username, password);
    }
 }

 module.exports = Admin;