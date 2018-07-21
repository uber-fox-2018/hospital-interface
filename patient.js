const fs = require('fs');

class PatientModel {
  constructor(employeeFile, patientFile) {
    // console.log(employeeFile, patientFile);
    
    this._employee = employeeFile;
    this._patients = patientFile;
  }

  set employee(employees) {
    this._employee = employees;
  }

  get employee() {
    return this._employee;
  }

  set patient(patients) {
    this._patients = patients;
  }

  get patient() {
    return this._patients;
  }

  showPatients(showPatients) {
    let notification = '';
    if(!showPatients.length) {
      notification = `No Data!`;
    }
    else {
      notification = [];
      for(let i = 0; i < showPatients.length; i++) {
        notification.push(showPatients[i]);
      }
    }
    return notification;
  }

  addPatient(patientName, diagnosis) {
    // console.log(this._patients, this._employee);
    
    
  }

}

module.exports = PatientModel;