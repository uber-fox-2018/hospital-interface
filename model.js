const fs = require('fs')

class Hospital{
    constructor(){
        this.parsingEmployee = ''
        this.parsingPatient = ''
    }

    readDataEmployee(cb){
        let that = this
        fs.readFile('./employee.json','utf8',function(err,data){
            if(err){
                throw err
            }else{
                that.parsingEmployee = JSON.parse(data)
                cb()
            }
        })
    }

    writeDataEmployee(updatedDataEmployee){
        fs.writeFile('./employee.json',JSON.stringify(updatedDataEmployee),function(err){
            if(err){
                throw err
            }
        })
    }

    register(username, password, role,cb){
        let that = this
        this.readDataEmployee(function(){
            var employee = new Employee(username, password, role)
            that.parsingEmployee.push(employee)
            that.writeDataEmployee(that.parsingEmployee)
            cb()
        })
    }

    
    static readEmployee(cb){
        fs.readFile('./employee.json','utf8',function(err,data){
            if(err){
                throw err
            }
            cb(JSON.parse(data))
        })
    }
    static writeEmployee(data){
        fs.writeFile('./employee.json',JSON.stringify(data),function(err){
            if(err){
                throw err
            }
        })
    }

   static readPatient(cb){
       fs.readFile('./patient.json','utf8',function(err,data){
           if(err){
               throw err
           }
           cb(JSON.parse(data))
       })
   }

   static writePatient(data){
       fs.writeFile('./patient.json',JSON.stringify(data),function(err){
           if(err){
               throw err
           }
       })
   }

    static login(cb){
        this.readEmployee(function(data){
            cb(data)
        })
    }

    static updateLogin(username){
        let that = this
        this.readEmployee(function(data){
            
            for(var i = 0; i < data.length;i++){
                if(data[i].username == username){
                    data[i].loginStatus = true 
                  
                    that.writeEmployee(data)
                }
            }
        })
    }

    static addPatient(name,diagnosis,cb){
        let that = this
        this.readPatient(function(data){
            var patient = new Patient(data.length+1,name,diagnosis)
            data.push(patient)
            that.writePatient(data)
            cb(data)
        })
        // this.writeEmployee()
    }

    static logout(cb){
        let that = this
        this.readEmployee(function(data){
            for(var i = 0; i < data.length;i++){
                if(data[i].loginStatus == true){
                    data[i].loginStatus = false
                    that.writeEmployee(data)
                    cb(data[i])
                }
            }
        })
    }


}

class Patient {
    constructor(id, name, diagnosis) {
      this.id = id
      this.name = name
      this.diagnosis = diagnosis
    }
  }

class Employee{
    constructor(username, password, role) {
        this.username = username
        this.password = password
        this.role = role
        this.loginStatus = false
    }
    
}

module.exports = Hospital