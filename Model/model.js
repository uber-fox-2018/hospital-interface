const fs = require('fs')


class Patient {
  constructor(id, name, diagnosis) {
    this._id = id
    this._name = name
    this._diagnosis = diagnosis
  }
}

class Employee {
  constructor(username, password, role) {
    this._username = username
    this._password = password
    this._role = role
    this._status = false
  }

  get name() {
    return this._name
  }

  get password() {
    return this._password
  }

  get role() {
    return this._role
  }

  get status() {
    return this._status
  }

  set status(state) {
    this._status = state
  }
}

class Hospital {
  constructor() {
    this._employees = null,
    this._patients = null
  }

  get employees() {
    return this._employees
  }

  set employees(newEmployee) {
    this._employees = newEmployee
  }

  get patients() {
    return this._patients
  }

  set patients(newPatient) {
    this._patients = newPatient
  }

  readFileEmployee(cb) {
    fs.readFile('employee.json', 'utf8', (err, data) => {
      (!err) ? this.employees = JSON.parse(data) : console.log(err);
      cb()
    })
  }

  readFilePatient(cb) {
    fs.readFile('patient.json', 'utf8', (err, data) => {
      (!err) ? this.patients = JSON.parse(data) : console.log(err);
      cb()
    })
  }

  writeFile(newData) {
    fs.writeFile('employee.json', JSON.stringify(newData), (err) => {
      (err) ? console.log(err) : 'Success';
    })
  }

  writeFilePatient(newData) {
    fs.writeFile('patient.json', JSON.stringify(newData), (err) => {
      (err) ? console.log(err) : 'Success';
    })
  }


  registerEmployee(username, password, role, callback) {
    this.readFileEmployee(() => {
      let newEmployee = new Employee(username, password, role)
      this.employees.push(newEmployee)
      this.writeFile(this.employees)
      callback()
    })
  }

  loginEmployee(username, password, callback) {
    this.readFileEmployee(() => {
      let condition = false
      this.employees.forEach(employee => {
        // console.log(employee._username); // tandain tanya
        if(employee._username === username && employee._password === password) {
          condition = true
          employee._status = true
          this.writeFile(this.employees)
          callback(employee._username, condition)
        }
      })
      if(condition === false) {
        callback(condition)
      }
    })
  }

  logoutEmployee(username, callback) {
    this.readFileEmployee(() => {
      let condition = false
      this.employees.forEach(employee => {
        if(employee._username === username) {
          condition = true
          employee._status = false
          this.writeFile(this.employees)
          callback(employee._username, condition)
        }
      })
      if(condition === false) {
        callback(null, condition)
      }
    })
  }

  addPatient(patient, diagnosis, callback) {
    this.readFileEmployee(() => {
      let condition = false
      this.employees.forEach(employee => {
        if(employee._role === 'dokter' && employee._status === true) {
          this.readFilePatient(() => {
            console.log(this.patients)
            let id = this.patients.length
            //this for check id 
            id = (id === 0) ?  1 :  this.patients.length + 1
            let newPatient = new Patient(id ,patient, diagnosis)
            this.patients.push(newPatient)
            this.writeFilePatient(this.patients)
            condition = true
            callback(condition)
          })
        }
      })
      if(condition === false) {
        callback(condition)
      }
    })
  }

}


module.exports = {
  Patient: Patient,
  Employee: Employee,
  Hospital: Hospital
}