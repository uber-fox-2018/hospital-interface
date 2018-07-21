const Employee = require('./employee');

class OfficeBoy extends Employee {
    constructor(username, password) {
        super('office boy', username, password);
    }
}

module.exports = OfficeBoy;