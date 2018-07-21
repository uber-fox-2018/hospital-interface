const fs = require('fs')

class Employee {

  static readData(cbDataEmployee){
    fs.readFile('./employee.json', 'utf-8', (err,data) => {
        let dataEmployee = JSON.parse(data)
        cbDataEmployee(dataEmployee)
    })
  }

  static writeData(dataEmployee){
    fs.writeFile('./employee.json', JSON.stringify(dataEmployee, null, 2), (err) => {
      
    })
  }

}

// Employee.readData()

module.exports = Employee
