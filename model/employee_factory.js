const Admin = require('./admin');
const OfficeBoy = require('./office_boy');
const Receptionist = require('./receptionist');
const Doctor = require('./doctor');

class EmployeeFactory {
    constructor() { }
    static create(username, password, position) {
        let employee = this._setType(position);
        employee.username = username;
        employee.password = password;
        return employee;
    }

    static assign(obj) {
        let employee = this._setType(obj['position']);
        Object.assign(employee, obj);
        return employee;
    }

    static _setType(position) {
        let employee
        switch (position) {
            case 'admin': employee = new Admin();
                break;
            case 'office boy': employee = new OfficeBoy();
                break;
            case 'receptionist': employee = new Receptionist();
                break;
            case 'doctor': employee = new Doctor();
                break;
            default: employee = undefined;
                break;
        }
        return employee;
    }
}

module.exports = EmployeeFactory;
