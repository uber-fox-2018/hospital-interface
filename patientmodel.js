const fs = require('fs');
const Employee = require('./employeemodel.js');

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }

  static readDataPatient(callback) {
    fs.readFile('./patients.json', 'utf8', (err, data) => {
      if (err) throw err
      callback(JSON.parse(data));
    })
  }

  static writeDataPatient(dataSaved, callback) {
    fs.writeFile('./patients.json', JSON.stringify(dataSaved), (err) => {
      if (err) throw err
      callback();
    })
  }

  static addPatient(name, diagnosis, callback) {
    // console.log(name, diagnosis);
    Patient.readDataPatient((patientData) => {
      Employee.readDataEmployee((employeeData) => {
        var rightPosition = false;
        // console.log(employeeData);
        for (let i = 0; i < employeeData.length; i++) {
          console.log(employeeData[i].position, employeeData[i].loginStatus);
          if (employeeData[i].position == 'doctor' && employeeData[i].loginStatus === true) {
            rightPosition = true;
            // console.log(id);
            let id = patientData.length;
            if (patientData.length == 0) {
              id = 1;
            } else {
              id = patientData.length + 1;
            }
            let patient = new Patient(id, name, diagnosis);
            patientData.push(patient);
            let data = patientData.length;
            var output = [patientData, data];
            Patient.writeDataPatient(patientData, function () {
              // console.log('----', patientData)
              callback(output, true);
            })
          }
        }
        callback(false)
      })
    })
  }

  
}

module.exports = Patient;
