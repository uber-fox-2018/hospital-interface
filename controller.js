const Employee = require('./employee')
const Patient = require('./patient')
const View = require('./view')

class Controller {
    constructor() {
        
    }

    static readEmpFile(){
        Employee.readEmp((data) => {
          View.showResult(data)
        });
    }

    static registerEmployee(username, password, role){
        Employee.registerEmp(username, password, role, (result) => {
            View.showResult(result)
        })
    }

    static loginEmployee(username, password){
        Employee.loginEmp(username, password, (result) => {
            View.showResult(result)  
        })
    }

    static readPatientFile(){
        Patient.readPatient((data) => {
          View.showResult(data)
        });
    }

    static addPatient(nama, diagnosa){
        Patient.addPatientNew(nama, diagnosa, (result) => {
            View.showResult(result)
        })
    }

    static logutEmployee (username) {
        Employee.logoutEmp(username, (result) => {
            View.showResult(result)
        })
    }

}

module.exports = Controller