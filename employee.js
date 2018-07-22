const fs = require('fs')

class Employee {
    constructor(username, password, role) {
        this.username = username
        this.password = password
        this.role = role
        this.loginStatus = false
    }

    static readEmp(callback){
        fs.readFile('./employee.json', 'utf8', (err,data) => {
          if (err) throw err;
          let EmpData = JSON.parse(data)
          callback(EmpData)
        })
    }

    static registerEmp(username, password, role, callback){
        let employee = new Employee(username, password, role)
        this.readEmp((data) => {
            data.push(employee)
            let dataEmp = JSON.stringify(data)
            fs.writeFile('./employee.json', dataEmp, (err) => {
                if (err) throw err;
                let result = `save data success ${JSON.stringify(employee)}. Total employee : ${data.length}`
                callback(result)
            })
        })
    }

    static loginEmp(username, password, callback){
        this.readEmp((data) => {
            let count = 0
            for(let i=0; i<data.length; i++){
                if(username === data[i].username && password === data[i].password){
                    data[i].loginStatus = true;
                    let dataEmp = JSON.stringify(data)
                    fs.writeFile('./employee.json', dataEmp, (err) => {
                        if (err) throw err
                        let result = `user ${username} loggin successfully`
                        callback(result)
                    })
                } else {
                    count++
                    
                }
            } 
            if(count > 0){
                let resultErr = `username / password wrong`
                callback(resultErr)
            }
            
        })
    }

    static logoutEmp(username, callback){
        this.readEmp((data) => {
          for (let i = 0; i < data.length; i++) {
            if (data[i].username === username) {
              data[i].loginStatus = false
              let dataEmp = JSON.stringify(data)
              fs.writeFile('employee.json', dataEmp, (err) => {
                if (err) throw err
                let result = `${data[i].username} successfully logged out`
                callback(result)
              })
            }
          }
        })
      }
}

module.exports = Employee;