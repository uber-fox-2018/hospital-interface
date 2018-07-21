const fs = require('fs')
const Employee = require('./employee')

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }

  static readFile(cb){
    fs.readFile('./patient.json','utf8',(err,patientData)=>{
        if(err) throw err;
        let data = JSON.parse(patientData)
        cb(data)
    })
  }

  static writeFile(jsonObjects){
    let jsonString = JSON.stringify(jsonObjects);
    fs.writeFile('./patient.json',jsonString,(err)=>{
        if (err) throw err
    })
  }

  static addPatient(name,diagnosis,cb){
    this.readFile(patientData=>{
      Employee.readFile(employeeData=>{
        employeeData.forEach(data => {
          if (data.position === 'doctor' && data.loginStatus === true){
            let id = patientData.length+1
            let patient = new Patient(id,name,diagnosis,cb)
            patientData.push(patient)
            this.writeFile(patientData)
            cb(patientData.length)
          } else if (data.position!=='doctor' && data.loginStatus === true) {
            let noAccess = false
            cb(noAccess)
          } 
        });
      })
    })
  }
}

module.exports = Patient



