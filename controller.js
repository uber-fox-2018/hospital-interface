let Patient = require('./model/patient')
let Employee = require('./model/employee')
let View = require('./view')


class Controller{
    constructor(){
        
    }

    addEmployee(username,pass,position){
        Employee.add(username,pass,position, (err,name,role,length) => {
            if (err) throw err
            View.showEmployee(name,role,length)
        })
    }

    loginEmployee(username,password){
        Employee.login(username,password, (err,status)=>{
            if (err) throw err
            View.showLogin(status)
        })
    }

    logOutEmployee(){
        Employee.logOut()
        View.showLogOut()
    }
}

module.exports = Controller