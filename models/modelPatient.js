const fs = require('fs')
const Employee = require('../models/modelEmployee')

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }

  static readFilePatient(callback) {
    fs.readFile('./patient.json', (err,data) => {
      if (err) throw err
      callback(JSON.parse(data))
    })
  }

  static writeFilePatient(data, callback) {
    fs.writeFile('./patient.json', JSON.stringify(data), (err) => {
      if (err) throw errr
    })
  }

  static addPatient(name, diagnosis, callback) {
    this.readFilePatient((dataPatient) => {
      Employee.readFileEmployee((dataEmployee) => {
        for (let i in dataEmployee) {
          if (dataEmployee[i].position == 'dokter' && dataEmployee[i].loginStatus == true) {
            let id = dataPatient.length
            if (dataPatient.length === 0) {
              id = 1
            } else {
              id = dataPatient.length + 1
            }
            let patient = new Patient(id, name, diagnosis)
            dataPatient.push(patient)
            this.writeFilePatient(dataPatient, () => {

            })
            var result = `data pasien berhasil ditambahkan. Total data pasien ${dataPatient.length}`
          } else if (dataEmployee[i].position !== 'dokter' && dataEmployee[i].loginStatus == true) {
            var resultError = `tidak memiliki akses untuk add patient`
            callback(result, resultError)
          }
        }
      })
    })
  }
}

module.exports = Patient