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

    static login_employee(username, password){
        modEmployee.login_employee(username, password, (err, isLogin) => {
            // console.log(err);
            let result = ''
            if (err === false){
                result += `Your username or password is invalid...`
            }else if (err === null){
                result += `You cant login becasuse, someone already login\nPlease type <logout> <username>`
            }else {
                if (err === true){
                    result += `${username} login successful...`
                }
            }
            View.display(result)
        })
    }

    static logout_employee(username){
        modEmployee.logout_employee(username, (err) => {
            let result =''
            if (err === true){
                result += `${username} logout successful...`
            }else {
                result += `You entered the wrong username...`
            }
            View.display(result)
        })
    }
  
    static addPatient(){
        
    }
}
module.exports= Controller