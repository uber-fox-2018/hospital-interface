const fs = require('fs')

class Employee {
    constructor(username, password, role) {
      this.position = role
      this.username = username
      this.password = password
      this.loginStatus = false
    }

    static readFile(cb){
        fs.readFile('./employee.json','utf8',(err,employeeData)=>{
            if(err) throw err;
            let data = JSON.parse(employeeData)
            cb(data)
        })
    }

    static writeFile(jsonObjects){
        let jsonString = JSON.stringify(jsonObjects);
        fs.writeFile('./employee.json',jsonString,(err)=>{
            if (err) throw err
        })
    }

    static add(username,pass,position,cb){
        this.readFile(jsonObjects => {
            let employee = new Employee(username,pass,position)
            jsonObjects.push(employee);
            this.writeFile(jsonObjects);
            cb(employee.username,employee.position,jsonObjects.length)
        })
    }

    static login(username,password,cb){
        this.readFile(jsonObjects => {
            let inUse = false
            jsonObjects.forEach(data=>{
                if (data.loginStatus===true){
                    inUse = true
                }
            })
            if (!inUse){
                let match = false
                jsonObjects.forEach(data => {
                    if (username===data.username && password===data.password) {
                        data.loginStatus = true
                        this.writeFile(jsonObjects)
                        match = true    
                    }
                });
                cb(match)
            } else if(inUse === true) {
                let match = undefined
                cb(match)
            }

        })
    }

    static logOut(){
        this.readFile(jsonObjects => {
            jsonObjects.forEach(data => {
                if (data.loginStatus === true){
                    data.loginStatus = false
                    this.writeFile(jsonObjects)
                }
            })
        })
    }
}



  
module.exports = Employee