const fs = require('fs')

class Employee {
    constructor(username, password, role) {
      this.role = role
      this.username = username
      this.password = password
      this.loginStatus = false
    }

    static readFile(cb){
        fs.readFile('./employee.json','utf8',(err,employeeData)=>{
            if(err) {
                throw err;
            }
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
            let obj = new Employee(username,pass,position)
            jsonObjects.push(obj);
            this.writeFile(jsonObjects);
            cb(null,obj.username,obj.role,jsonObjects.length)
        })
    }

    static login(username,password,cb){
        this.readFile(jsonObjects => {
            jsonObjects.forEach(data => {
                if (data.loginStatus === true){
                    console.log(data.username)
                }
                if (data.username === username && data.password === password && data.loginStatus === false) {
                    data.loginStatus = true
                    this.writeFile(jsonObjects);
                    cb(null,data.loginStatus)
                } 
            });
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