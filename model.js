const fs = require('fs')
const View = require('./view.js')
class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }
}

class Employee {
  constructor(name, position, username, password) {
    this.name = name
    this.position = position
    this.username = username
    this.password = password
    this.newData =  null
  }
}
var employee = new Employee()
class Model {
  static readFile(cb,fileRegister){
    fs.readFile('./employee.json','utf-8',(err,data) =>{
      var dataEmployee = JSON.parse(data)
      employee.newData = dataEmployee
      cb(employee.newData,fileRegister)
    })
  }
  static addEmployee(oldData,fileRegister){
    oldData.push(fileRegister)
    var newData = JSON.stringify(oldData)
    // console.log(oldData,fileRegister)
    fs.writeFile('./employee.json',newData,(err)=>{
      View.displayAddEmployee(oldData[oldData.length-1],oldData.length)
    })

  }
  static checkStatus(cb, dataLogin){
    fs.readFile('./employee.json','utf-8',(err,data) =>{
      var data = JSON.parse(data)
      cb(data,dataLogin)
    })
  }
  static changeStatusLogin(data,dataLogin){
    
    var data = JSON.stringify(data)
    // console.log('berhasil login')
    
    fs.writeFile('./employee.json',data,(err) =>{
      View.displayLogin(dataLogin)
    })

  }
  static getDataPatient(patientData,cb){
    // console.log(patientData)
    fs.readFile('./patientData.json','utf-8',(err,data) =>{
      var dataPasien = JSON.parse(data)
      fs.readFile('./employee.json','utf-8',(err,data) =>{
        var dataEmployee = JSON.parse(data)
        dataPasien.push(patientData)
        cb(dataPasien,dataEmployee)
      })
      
      
    })
  }
  static updatePatientData(data){
    fs.writeFile('./patientData.json',JSON.stringify(data),(err) =>{
      View.patientAdded(data)
    })
  }
  static UpdateLoginStatus(employee,employeeLogout){
    fs.writeFile('./employee.json',JSON.stringify(employee),(err) =>{
      View.logout(employeeLogout)
    })
  }
}




module.exports = {patient : Patient, employee : Employee, model:Model}