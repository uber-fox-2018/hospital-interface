// const employee = require('../model/employee');
// const patient = require('../model/patient');
const view = require('./view');
const employee = require('./employee');
const patient = require('./patient');

class Controller {
  constructor(employeeFile, patientFile) {
    this.employeeModel = new employee(employeeFile);
    this.patientModel = new patient(employeeFile, patientFile);
    this.view = new view();
    
  }

  help() {
    let menu = this.employeeModel.help();
    this.view.help(menu);
  }

  register(username, password, role) {
    let employeeRegisted = this.employeeModel.register(username, password, role);
    this.view.register(employeeRegisted);

  }

  drop(username, employeeObj) {
    let employeeDroped = this.employeeModel.drop(username, employeeObj);
    this.view.drop(employeeDroped);
  }

  showEmployees(employeeObj) {
    let showEmployees = this.employeeModel.showEmployees(employeeObj);
    this.view.showEmployees(employeeObj);
  }

  showPatients(patientObj) {
    let showPatients = this.patientModel.showPatients(patientObj);
    this.view.showPatients(showPatients);
  }

  login(username, password) {
    let userLogIn = this.employeeModel.login(username, password);
    this.view.login(userLogIn);
  }

  addPatient(patientName, diagnosis) {
    let patientAdded = this.patientModel.addPatient(patientName, diagnosis);
    this.view.addPatient(patientAdded);
  }

  logout() {

  }

}

module.exports = Controller;