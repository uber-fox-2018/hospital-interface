const fs = require('fs');
class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }
}

class Employee {
  constructor(name, position, username, password) {
    this.name = name
    this.position = position
    this.username = username
    this.password = password
  }
}

class Model {
	static ReadEmployee(employeeHandler) {
		fs.readFile('./employee.json', 'utf8', (err, data) => {
			if(!err) {
				employeeHandler(JSON.parse(data))
			} else {
				console.log("error")
			}
		});
	}

	static registerEmployee(newEmployee) {
		fs.writeFile('./employee.json', JSON.stringify(newEmployee, null, 4), (err) => {

		});
	}
}

module.exports = Model