const fs = require('fs')
const Employee = require('./employee')

class Patient {
    constructor(id, nama, diagnosa) {
        this.id = id
        this.nama = nama
        this.diagnosa = diagnosa
    }

  
    static readPatient(callback){
        fs.readFile('./patient.json',(err,data) => {
          if (err) throw err;
          let EmpData = JSON.parse(data)
          callback(EmpData)
        })
    }

    static addPatientNew(nama, diagnosa, callback){
        this.readPatient((dataPatient) => {
          Employee.readEmp((dataEmployee) => {
            for (let i = 0; i < dataEmployee.length; i++) {
              if (dataEmployee[i].role === 'dokter' && dataEmployee[i].loginStatus === true) {
                let id = dataPatient.length+1
                let patient = new Patient(id,nama,diagnosa)
                dataPatient.push(patient)
                let patientData = JSON.stringify(dataPatient)
                fs.writeFile('patient.json', patientData, (err) => {
                  if (err) throw err
                  let result = `data pasien berhasil ditambahkan. Total data pasien ${dataPatient.length}`
                  callback(result)
                })
              }else if (dataEmployee[i].role !== 'dokter' && dataEmployee[i].loginStatus === true) {
                let result = `yang bisa add patient cuma dokter cuy`
                callback(result)
              }
            }
          })
        })
    }

}

module.exports = Patient