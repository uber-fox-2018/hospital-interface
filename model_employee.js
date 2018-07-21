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
    fs.readFile('./employee.json', 'utf8', (err,data) => {
      if (err) throw err
      callback_read(JSON.parse(data))
    })
  }

  static writeListEmployee (data, callback_write){
    fs.writeFile('./employee.json', JSON.stringify(data), (err) => {
      if (err) throw err
      callback_write()
    })
  }

  static register_employee (name, position, username, password, callback_register){
    Employee.readListEmployee((data) => {
      let employee = new Employee (name, position, username, password)
      data == 0 ? employee.id = 1 : employee.id = data.length + 1
      data.push(employee)
      let temp = [employee, data.length]
      Employee.writeListEmployee(data, function() {
        callback_register(temp)
      })
    })
  }

  static login_employee(username, password, callback_login){
    Employee.readListEmployee ((data) => {
      
      let totaldata = data.length
      let count = 0
      let valid = false
      let isAlreadyLogin = false
      let idxLogin = 0

      for (let i = 0 ; i < data.length ; i++){
        let user = data[i].username
        let pass = data[i].password
        let status = data[i].logStatus

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
          data[idxLogin].logStatus = true
          Employee.writeListEmployee(data, (err) => {
            if (err) throw err
            callback_login(true)
          })
        }
      }
    })
}

  static logout_employee(username, callback_logout){
    Employee.readListEmployee((data) => {
      let isValid = false
      let idxLogout = 0
      for (let i = 0 ; i < data.length ; i++){
        let user = data[i].username
        let status = data[i].logStatus
        if (user === username && status === true){
          idxLogout = i
          isValid = true
        }
      }
      if (isValid === false){
        callback_logout(null)
      }else {
        data[idxLogout].logStatus = false
        Employee.writeListEmployee(data, (err) => {
          if (err) throw err
          callback_logout(true)
        })
      }
    })
  }

  static addPatient(){
      // check dokter ?
  }

}module.exports = Employee