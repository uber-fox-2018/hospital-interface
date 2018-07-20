const fs = require('fs')

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
  }
}

class Model{

  static read(file,cb){
    fs.readFile(file,(err,data)=>{
      if(err){
        throw err
      }
      var listEmployee  = JSON.parse(data)
      cb(listEmployee)
    })
  }

  static write(file,data,cb){
    fs.writeFile(file,JSON.stringify(data,null,2),function(err){
      if(err){
        throw err
      }
      cb(JSON.stringify(data))
    })
  }

  static registerEmployee(name,position,username,password,cb){
    Model.read('employee.json',function(dataEmployee){
      var objEmployee = new Employee(name,position,username,password)
      dataEmployee.push(objEmployee)
      var jumlahEmployee = dataEmployee.length
      Model.write('employee.json',dataEmployee,function(){
        cb(objEmployee,jumlahEmployee)
      })
    })
  }

  static login(username,password,cb){
    var check = 0
    Model.read('employee.json',function(dataEmployee){
      for(let i = 0; i<dataEmployee.length; i++){
        if(dataEmployee[i].username === username && dataEmployee[i].password ===  password){
          dataEmployee[i].status = true
          check += 1
        }else{
          dataEmployee[i].status = false
        }
      }
      if(check>0){
        cb(username)
      }else{
        cb('x')
      }
      Model.write('employee.json',dataEmployee,function(){
      })
    })
  }

  static addPatient(id,name,diagnosis,cb){
    var check = 0;
    Model.read('employee.json',function(dataEmployee){
      for(let i =0; i<dataEmployee.length; i++){
        if(dataEmployee[i].position === "Dokter" && dataEmployee[i].status === true){
          check = 1
        }
      }
      if(check === 1){
        Model.read('patient.json',function(dataPatient){
          var objPatient = new Patient(id,name,diagnosis)
          dataPatient.push(objPatient)
          var jumlahPasien = dataPatient.length
          Model.write('patient.json',dataPatient,function(err){
            cb(jumlahPasien)
          }) 
        })
      }else{
        cb('x')
      }
    })
  }


}

module.exports = Model
