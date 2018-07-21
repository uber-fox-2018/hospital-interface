const Employee = require('./employee');

class Doctor extends Employee {
  constructor(username, password) {
    super('doctor', username, password);
    this.patients = [];
  }
}

module.exports = Doctor;