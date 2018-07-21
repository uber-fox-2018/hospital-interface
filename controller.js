let Patient = require('./model/patient')
let Employee = require('./model/employee')
let View = require('./view')


class Controller{
    constructor(){
        
    }

    addEmployee(username,pass,position){
        Employee.add(username,pass,position, (name,role,length) => {
            View.showEmployee(name,role,length)
        })
    }

    loginEmployee(username,password){
        Employee.login(username,password,status=>{
            View.showLogin(status)
        })
        
    }

    logOutEmployee(){
        Employee.logOut()
        View.showLogOut()
    }

    addPatient(name,diagnosis){
        Patient.addPatient(name,diagnosis,status => {
            View.showAddPatient(status)
        })
    }
}

module.exports = Controller