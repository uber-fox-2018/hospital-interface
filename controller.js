const modelEmployee = require('./model_employee')
const modelPatient = require('./model_patient')
const View = require('./view')

class Controller {
    constructor(argv){
        this.command = argv
        this.data = []
        this.cmd()
    }

    cmd(){
        if(this.command[0] == 'list-employee'){
            this.readDataEmployee()
        } else if(this.command[0] == 'register'){
            this.register()
        } else if(this.command[0] == 'login'){
            this.login()
        } else if(this.command[0] == 'logout'){
            this.logout()
        } else if(this.command[0] == 'list-patient'){
            this.readDataPatient()
        } else if(this.command[0] == 'patient'){
            this.addPatient()
        }
    }

    logout(){
        modelEmployee.readData( data => {
            let dataLogut = data
            let message
            for(let i = 0; i < dataLogut.length; i++){
                
                if(dataLogut[i].status_login == true || dataLogut[i].status_login == 'undefined') {
                    dataLogut[i].status_login = false
                    modelEmployee.writeData(dataLogut)
                    message = 'Logut success'   
                }
                
            }    
            View.displayData(message) 
            
        })
    }

    login(){
        modelEmployee.readData( data => {
            let dataLogin = data
            let username = this.command[1]
            let password = this.command[2]

            for(let i = 0; i < dataLogin.length; i++){
                let message = ''
                if (dataLogin[i].status_login == true){
                    message = `Sorry, Other user has login`
                    View.displayData(message)
                }
                else { 
                    if(dataLogin[i].status_login == false && dataLogin[i].username == username && dataLogin[i].password == password){
                        this.data = dataLogin
                        this.data[i].status_login = true
                        modelEmployee.writeData(this.data)
                        message = `welcome ${this.data[i].username}`
                        View.displayData(message)
                        this.data = []
                    }
                } 
            }
        })
    }

    readDataEmployee(){
        modelEmployee.readData( data => {
            View.displayDataEmployee(data)
        })
    }

    register(){
        modelEmployee.readData( data => {
           this.data = data
           let id = data[data.length - 1].id + 1
           let newEmployee = {
               "id" : id,
               "username" : this.command[1],
               "password" : this.command[2],
               "role" : this.command[3],
               "status_login" : false
           }
           this.data.push(newEmployee)
           modelEmployee.writeData(this.data)
           this.data = []
        })
    }

    readDataPatient(){
        modelPatient.readData( data => {
            View.displayDataPatient(data)
        })
    }

    addPatient(){
        modelEmployee.readData( employee => {
            let message
            for(let i = 0; i < employee.length; i++){
                if(employee[i].role == 'doctor' && employee[i].status_login == true){
                    modelPatient.readData( patient => {
                        this.data = patient
                        let id = patient[patient.length - 1].id + 1
                        let newPatient = {
                            "id" : id,
                            "name" : this.command[1]
                        }
                        newPatient.disease = []
                        for(let j = 2; j < this.command.length; j++){
                            newPatient.disease.push(this.command[j])
                        }
                        this.data.push(newPatient)
                        modelPatient.writeData(this.data)
                        this.data = []
                        message = 'Success add patient'
                    })
                } else {
                    message = 'You are not doctor'
                }
            }
            View.displayDataPatient(message)
        })
        
    }

}

module.exports = Controller