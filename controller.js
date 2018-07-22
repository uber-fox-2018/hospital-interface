const modEmployee = require('./model_employee.js');
const modPatient = require('./model_patient.js');
const View = require('./view.js')

class Controller {

    static register_employee(name, position, username, password){
        modEmployee.register_employee(name, position, username, password, (data_employee) => {
            let currentTotalData = data_employee[1]
            let temp = `Username : ${username}\nPosition : ${position}\n Successfully registered...\n\nTotal employee : ${currentTotalData}`
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
                    result += `Username : ${username} login successful...`
                }
            }
            View.display(result)
        })
    }

    static logout_employee(username){
        modEmployee.logout_employee(username, (err) => {
            let result =''
            if (err === true){
                result += `Username : ${username} logout successful...`
            }else {
                result += `You entered the wrong username...`
            }
            View.display(result)
        })
    }
  
    static addPatient(name, diagnosis){
        modPatient.addPatient(name, diagnosis, (data_patient, isDoctor) => {
            let result =''
            
            if (isDoctor === undefined && data_patient !== null){
                result += `You dont have access to add Patient...`
            }else if (data_patient === null){
                result += `Please type name or diagnosis correctly...`
            }else {
                result += `Name : ${name} | Diagnosis : ${diagnosis} | Add successful...\n\nTotal Patient : ${data_patient}`
            }
            View.display(result)
        })
    }
}
module.exports= Controller
