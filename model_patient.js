const fs = require('fs')
const Employee = require('./model_employee.js')

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }

  static readListPatient (callback){
    fs.readFile('./patient.json', 'utf8', (err, data_patient) => {
      if (err) throw err
      callback(JSON.parse(data_patient))
    })
  }

  static writeListPatient (data_patient, callback){
    fs.writeFile('./patient.json', JSON.stringify(data_patient), (err) => {
      if (err) throw err
      callback()
    })
  }

  static addPatient (name, diagnosis, callback_addPatient){
    
    Patient.readListPatient((data_patient) => {
      Employee.readListEmployee ((data_employee) => {
        let isDoctorLogin = false
        for (let i = 0 ; i < data_employee.length ; i++){
          let doctor = data_employee[i].position
          let status = data_employee[i].logStatus
          if (doctor == 'doctor' && status === true){
            isDoctorLogin = true
          }
        }

        let currentId = data_patient.length
        if (isDoctorLogin === false){
          callback_addPatient(false)
        }else if (name == undefined || diagnosis == undefined){
          callback_addPatient(null)
        }else {
          if (currentId === 0){
            currentId = 1
          }else {
            currentId += 1
          }
          let createPatient = new Patient(currentId, name, diagnosis)
          data_patient.push(createPatient)
          Patient.writeListPatient(data_patient, function(){
            callback_addPatient(currentId, true)
          })
        }
      })
    })
  }
}
module.exports = Patient