const fs = require('fs')

class Employee {
  constructor(username, password, position) {
    this.username = username
    this.password = password
    this.position = position
    this.loginStatus = false
  }

  static readFileEmployee(callback) {
    fs.readFile('./employee.json', (err,data) => {
      if (err) throw err
      callback(JSON.parse(data))
    })
  }

  static writeFileEmployee(data, callback) {
    fs.writeFile('./employee.json', JSON.stringify(data), (err) => {
      if (err) throw errr
    })
  }

  static register(username, password, position, callback) {
    this.readFileEmployee((data) => {
      let employeeData = new Employee(username, password, position)
      data.push(employeeData)
      this.writeFileEmployee(data, () => {

      })
      let result = `save data success ${JSON.stringify(employeeData)} Total employee : ${data.length}`
      callback(result)
    })
  }

  static login(username, password, callback) {
    this.readFileEmployee((data) => {
      let counter = 0
      for (let i in data) {
        if (username == data[i].username && password == data[i].password) {
          data[i].loginStatus = true
          this.writeFileEmployee(data, () => {

          })
          var result = `user ${username} logged in successfully`
        } else {
          counter++
        }
      }
      if (counter > 0) {
        let resultError = `username / password wrong`
        callback(result,resultError)
      }
    })
  }

  static logout(username, callback) {
    this.readFileEmployee((data) => {
      for (let i in data) {
        if (username == data[i].username) {
          data[i].loginStatus = false
          this.writeFileEmployee(data, () => {

          })
          var result = `user ${username} logged out successfully`
          callback(result)
        }
      }
    })
  }
}

module.exports = Employee
