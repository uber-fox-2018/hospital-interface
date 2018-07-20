const Patient = require('../model/patient')
const view = require('../view/view')

class PatientController {
  constructor() {
    this.modelPatient = new Patient()
  }

  addPatient(add_patient) {
    this.modelPatient.addPatient(add_patient, (message) => {
      view.messagePatient(message)
    })
  }
}

module.exports = PatientController