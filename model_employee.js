const fs = require('fs')

class Employee {
  constructor(name, position, username, password) {
    this.name = name
    this.position = position
    this.username = username
    this.password = password
    this.logStatus = false
  }
  
  static readListEmployee (callback_read){
    fs.readFile('./employee.json', 'utf8', (err,data_employee) => {
      if (err) throw err
      callback_read(JSON.parse(data_employee))
    })
  }

  static writeListEmployee (data_employee, callback_write){
    fs.writeFile('./employee.json', JSON.stringify(data_employee), (err) => {
      if (err) throw err
      callback_write()
    })
  }

  static register_employee (name, position, username, password, callback_register){
    Employee.readListEmployee((data_employee) => {
      let employee = new Employee (name, position, username, password)
      data_employee == 0 ? employee.id = 1 : employee.id = data_employee.length + 1
      data_employee.push(employee)
      let temp = [employee, data_employee.length]
      Employee.writeListEmployee(data_employee, function() {
        callback_register(temp)
      })
    })
  }

  static login_employee(username, password, callback_login){
    Employee.readListEmployee ((data_employee) => {
      
      let totaldata = data_employee.length
      let count = 0
      let valid = false
      let isAlreadyLogin = false
      let idxLogin = 0

      for (let i = 0 ; i < data_employee.length ; i++){
        let user = data_employee[i].username
        let pass = data_employee[i].password
        let status = data_employee[i].logStatus

        if (user === username && pass === password){
          if (status === false){
            valid = true
            idxLogin = i
          }
        }else if (status === true){
          isAlreadyLogin = true
        }else {
          count++
        }
      }

      if (isAlreadyLogin === true){
        callback_login(null)
      }else if (count === totaldata){
        callback_login(false)
      }else{
        if (valid === true){
          data_employee[idxLogin].logStatus = true
          Employee.writeListEmployee(data_employee, (err) => {
            if (err) throw err
            callback_login(true)
          })
        }
      }
    })
}

  static logout_employee(username, callback_logout){
    Employee.readListEmployee((data_employee) => {
      let isValid = false
      let idxLogout = 0
      for (let i = 0 ; i < data_employee.length ; i++){
        let user = data_employee[i].username
        let status = data_employee[i].logStatus
        if (user === username && status === true){
          idxLogout = i
          isValid = true
        }
      }
      if (isValid === false){
        callback_logout(null)
      }else {
        data_employee[idxLogout].logStatus = false
        Employee.writeListEmployee(data_employee, (err) => {
          if (err) throw err
          callback_logout(true)
        })
      }
    })
  }
}
module.exports = Employee