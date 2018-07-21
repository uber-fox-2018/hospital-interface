const fs = require('fs')
const Employee = require('./model_employee.js')

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }

  static readListPatient (callback){
    fs.readFile('./model_patient.js', 'utf8', (err,data) => {
      if (!err) callback(JSON.parse(data))
    })
  }

  static writeListPatient (data, callback){
    fs.readFile('./model_employee', JSON.stringify(data), (err) => {
      if (!err) callback()
    })
  }

  static register_patient (id, name, diagnosis, callback){
    
  }

}module.exports = Patient