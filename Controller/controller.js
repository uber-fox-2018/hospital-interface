const Model = require('../Model/model')
const Patient = Model.Patient
const Employee = Model.Employee
const View = require('../View/view')

class Controller {
    constructor() {
        this._patient = new Patient()
        this._employee = new Employee()
    }
}


module.exports = Controller