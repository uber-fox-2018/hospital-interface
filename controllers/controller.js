const Patient = require('../models/modelPatient')
const Employee = require('../models/modelEmployee')
const View = require('../views/view')

class Controller {
    static register(username, password, position) {
        Employee.register(username, password, position, (result) => {
            View.showMessage(result)
        }) 
    }

    static login(username, password) {
        Employee.login(username, password, (result, resultError) => {
            if (result) {
               View.showMessage(result)
            } else {
                View.showMessage(resultError)
            }  
        })
    }

    static logout(username) {
        Employee.logout(username, (result) => {
            View.showMessage(result)
        })
    }

    static addPatient(name, diagnosis) {
        Patient.addPatient(name, diagnosis, (result, resultError) => {
            if (result) {
                View.showMessage(result)
            } else {
                View.showMessage(resultError)
            }
        })
    }
}

module.exports = Controller