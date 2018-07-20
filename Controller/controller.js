const Model = require('../Model/model')
const Patient = Model.Patient
const Employee = Model.Employee
const Hospital = Model.Hospital
const View = require('../View/view')

class Controller {
    constructor() {
        this._hospital = new Hospital()
        this._data = null
    }

    get hospital() {
        return this._hospital
    }

    helpMenu() {
        View.displayMessage(`
        $ node index.js help
        `)
    }

    menu() {
        View.displayMessage(`
        $ node index.js register <Username> <Password> <Position>
        $ node index.js login <Username> <Password>
        $ node index.js addPatient <name_patient> <diagnosis> .. .. ..
        $ node index.js logout <Username>
        `)
    }

    // startAll(cb) {
    //     this.model.readFile(function() {
    //         cb()
    //     })
    // }


    registerEmployee(username, password, role) {
        this.hospital.registerEmployee(username, password, role, () => {
            let lengthData = this.hospital.employees.length
            View.displayMessage(`Save data success ${JSON.stringify(this.hospital.employees[lengthData -1])}. Total employees: ${lengthData}`)
        })
    }

    loginEmployee(username, password) {
        this.hospital.loginEmployee(username, password, (username, condition) => {
            (condition)  ?  View.displayMessage(`user ${username} logged in successfully`) : View.displayMessage('username or password wrong')
        })
    }

    logoutEmployee(username) {
        this.hospital.logoutEmployee(username, (user, condition) => {
            (condition) ? View.displayMessage(`user ${user} logged out`) : View.displayMessage(`your account has been logged out`)
        })
    }

    addPatient(patient, diagnosis) {
        this.hospital.addPatient(patient, diagnosis, (condition) => {
            (condition) ? View.displayMessage(`Data patient berhasil di tambahkan. Total patient ${lengthData}`) : View.displayMessage('sorry you can not access this feature')
        })
    }

}


module.exports = Controller