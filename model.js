

const fs = require('fs')
const Controller = require('./controller.js')


class Model{

  constructor(file){
    this._file = file;
  }

  readProcessing(fileData, callback){
    
    fs.readFile(fileData, 'utf8', (err, data)=>{
      if(err) callback(err);
      let dataString = JSON.parse(data)
      callback(dataString) 
    })
  }

  read(callback){
    let file = this._file
    this.readProcessing(model._file, callback)
  }
  
  

  createEmployee(employeeInfo){

  }

  write(){
  }

}



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

let model = new Model('./employee.json');






module.exports = model;