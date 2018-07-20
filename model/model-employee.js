const fs = require('fs')
const Patient = require('./model-patient')

class Employee {
    constructor(username, password, position) {
      this.username = username
      this.password = password
      this.position = position
      this.login    = false
    }
}

class Model {
  constructor(){
    this.data_employee = null
    this.data_patient  = null
  }

  readFile(callback){
    fs.readFile('employee.json','utf8', (err,data) => {
      if (err) throw err
      let convertedData = JSON.parse(data)
      this.data_employee = convertedData
      callback(convertedData)
    })
  }

  readFilePatient(callback){
    fs.readFile('patient.json','utf8', (err,data) => {
      if (err) throw err
      let convertedData = JSON.parse(data)
      this.data_patient = convertedData
      callback(convertedData)
    })
  }

  registerData(username,password,position,callback){
    this.readFile((data) => {
      let employee = new Employee(username,password,position)
      data.push(employee)
      let empData = JSON.stringify(data)
      fs.writeFile('employee.json',empData, (err) => {
        if (err) throw err
        callback(null,empData,data.length)
        })
    })
  }

  loginEmployee(username,password,callback){
    this.readFile((data) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].username === username && data[i].password === password) {
            data[i].login = true
            let newData = JSON.stringify(data)
            fs.writeFile('employee.json',newData,(err) => {
              if (err) throw err
              callback(null,data[i].username,data[i].login)
            })
          }
        }
    })
  }

  addPatient(name,diagnosis,callback){
    this.readFilePatient((data_patient) => {
      this.readFile((data_employee) => {
        for (let i = 0; i < data_employee.length; i++) {
          if (data_employee[i].position === 'dokter' && data_employee[i].login === true) {
            let newId = data_patient.length+1
            let patient = new Patient(newId,name,diagnosis)
            data_patient.push(patient)
            let patientData = JSON.stringify(data_patient)
            fs.writeFile('patient.json',patientData,(err) => {
              if (err) throw err
              callback(data_patient.length)
            })
          }else if (data_employee[i].position !== 'dokter' && data_employee[i].login === true) {
            callback(null)
          }
        }
      })
    })
  }

  logoutEmployee(username,callback){
    this.readFile((data) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].username === username) {
          data[i].login = false
          let newData = JSON.stringify(data)
          fs.writeFile('employee.json',newData,(err) => {
            if (err) throw err
            callback(null,data[i].username)
          })
        }
      }
    })
  }

}

  module.exports = Model