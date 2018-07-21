const modEmployee = require('./model_employee.js');
const modPatient = require('./model_patient.js');
const View = require('./view.js')

class Controller {

    static register_employee(name, position, username, password){
        modEmployee.register_employee(name, position, username, password, (data) => {
            let currentTotalData = data[1]
            let temp = `username: ${username}\nposition: ${position}\nsuccessfully registered...\n\nTotal employee : ${currentTotalData}`
            View.display(temp)
        })
    }

    static login_employee(){

    }

    static logout_employee(){
        
    }
  
    static addPatient(){
        
    }
}
module.exports= Controller