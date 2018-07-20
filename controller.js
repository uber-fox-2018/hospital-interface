let Model_patient = require('./model_patient.js')
let Model_employee = require('./model_employee.js')

let view = require('./view.js')

class Controller {
    constructor(){
        this.model_patient = new Model_patient()
        this.model_employee = new Model_employee()
        this.status_login;
    }

    registration_employee(userName,myPassword,myPosition){
        
        let regisData_employee = {user_name : userName, my_password : myPassword,status_login : false,role : myPosition}
        this.model_employee.add(regisData_employee,success =>{
            view.showAddData(success)
        })
    }

    login(userName,myPassword){
        this.model_employee.login(userName,myPassword, (success) =>{
            view.login(success) 
        })       
    }

    addPatient(userName,namaPatient,diagnosa){
        this.model_employee.addPatient(userName,namaPatient,diagnosa, statusAddPatient => {
            view.addPatient(statusAddPatient)
        })
    }

    logout(){
        this.model_employee.logout()
    }
}

module.exports = Controller