const Model = require('./model')
const View = require('./view')

class Controller{

    static register(name,position,username,password,login){
        Model.registerEmployee(name,position,username,password,function(result,jumlahEmployee){
            View.showRegister(result,jumlahEmployee)
        })
    }

    static login(username,password){
        Model.login(username,password,function(result){
            View.showLogin(result)
        })
    }

    static addPatient(id,name,diagnosis){
        Model.addPatient(id,name,diagnosis,function(result){
            View.showAdd(result)
        })
    }



}

module.exports = Controller