const fs = require('fs')
const Employee = require('./employee')

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
    this.dataPatient = null
    this.modelEmployee = new Employee()
  }

  readFilePatient(callback) {
    fs.readFile('patient.json', 'utf-8', (err, data) => {
      if (err) throw err
      this.dataPatient = JSON.parse(data)
      callback()
    })
  }

  writeFilePatient(addNewPatient) {
    fs.writeFile('patient.json', JSON.stringify(addNewPatient), err => {
      if (err) throw err;
    })
  }

  addPatient(newPatient, callback) {
    this.modelEmployee.readFile(() => {
      this.modelEmployee.data.map(employee => {
        if (employee.isLogin === true && employee.position === 'dokter') {

          this.readFilePatient(() => {
            if (this.dataPatient.length === 0) {
              var id = 1
            } else {
              id = this.dataPatient[this.dataPatient.length-1].id + 1
            }
  
            let addNewPatient = {
              id: id,
              name: newPatient.name,
              diagnosis: newPatient.diagnosis
            }
  
            this.dataPatient.push(addNewPatient)
            this.writeFilePatient(this.dataPatient)
            let totalPatient = this.dataPatient.length
            callback(`Data berhasil di masukkan. Total patient: ${totalPatient}`)
          })
          
        } else {
          callback('tidak punya akses add patient')
        }
      })
    })
  }
}

module.exports = Patient
