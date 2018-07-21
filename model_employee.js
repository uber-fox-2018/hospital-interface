const fs = require('fs')

class Employee {
  constructor(name, position, username, password) {
    this.name = name
    this.position = position
    this.username = username
    this.password = password
    this.logStatus = false
  }
  
  static readListEmployee (callback){
    fs.readFile('./employee.json', 'utf8', (err,data) => {
      if (err) throw err
      callback(JSON.parse(data))
    })
  }

  static writeListEmployee (data, callback){
    fs.writeFile('./employee.json', JSON.stringify(data), (err) => {
      if (err) throw err
      callback()
    })
  }

  static register_employee (name, position, username, password, callback){
    Employee.readListEmployee((data) => {
      let employee = new Employee (name, position, username, password)
      data == 0 ? employee.id = 1 : employee.id = data.length + 1
      data.push(employee)
      let temp = [employee, data.length]
      Employee.writeListEmployee(data, function() {
        callback(temp)
      })
    })
  }

  static login_employee(){
    // check valid ?
  }

  static logout_employee(){
      
  }

  static addPatient(){
      // check dokter ?
  }

}module.exports = Employee