const Model = require('../model/model-employee')
const View = require('../view/view')

class Controller {
    constructor(){
        this.model_employee = new Model()
    }

    register(username,password,position){
        this.model_employee.registerData(username,password,position, (err,data,length) => {
            if (err) {
                View.showError(err)
            }else {
                View.showRegistered(data,length)
            }
        })
    }

    login(username,password){
        this.model_employee.loginEmployee(username,password, (err,name,status) => {
            if (err) {
                View.showError(err)
            }else {
                View.showLogin(name,status)
            }
        })
    }

    addPatient(name,diagnosis){
        this.model_employee.addPatient(name,diagnosis, (data) => {
            View.showPatients(data)
        })
    }

    logout(username,password){
        this.model_employee.logoutEmployee(username,(err,data) => {
            if (err) {
                View.showError(err)
            }else {
                View.showLogout(data)
            }
        })
    }
}

module.exports = Controller