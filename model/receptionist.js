const Employee = require('./employee');

class Receptionist extends Employee {
    constructor(username, password) {
        super('receptionist', username, password);
    }
}

module.exports = Receptionist;