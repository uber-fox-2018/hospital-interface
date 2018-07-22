const fs = require('fs');

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
    this.loginStatus = false
  }
}

class Hospital {
  constructor (){
    this._dataPatient = null
    this._dataEmployee = null
  }

  get dataPatient (){
    return this._dataPatient;
  }

  set dataPatient (newData){
    return this._dataPatient = newData;
  }

  get dataEmployee (){
    return this._dataEmployee;
  }

  set dataEmployee (newData){
    return this._dataEmployee = newData;
  }

  readFilePatient (cb){
    fs.readFile('patients.json', 'utf8', (err, data) => {
      if (err){
        console.log(err.message);
      } else {
        this.dataPatient = JSON.parse(data);
        cb();
      }
    })
  }

  readFileEmployee (cb){
    fs.readFile('employees.json', 'utf8', (err, data) => {
      if (err){
        console.log(err.message);
      } else {
        this.dataEmployee = JSON.parse(data);
        cb();
      }
    })
  }


  writeFile (path, data, cb){
    fs.writeFile (path, JSON.stringify(data), (err) => {
      if (err) {
        console.log(err.message)
      } else {
        cb()
      }
    })
  }

  addEmployee (empObj){
    let newEmp = new Employee (empObj.name, empObj.role, empObj.username,empObj.password);
    this.dataEmployee.push(newEmp);
  }

  isAnotherLoggedIn (){
    let loggedInUsers = this.dataEmployee.filter((user) => {
      return user.loginStatus === true;
    })
    if (loggedInUsers.length === 0){
      return false;
    }
    return true;
  }

  passwordCheck (username, pass, cb){
    let theUser = this.dataEmployee.filter((user) => {
      return user.username == username && user.password == pass;
    })
    if (theUser.length === 0){
      cb (false);
    } else {
      cb (true);
    }
  }

  loggingIn (username){
    this.dataEmployee.forEach((user) => {
      if (user.username == username){
        user.loginStatus = true;
      }
    })
  }

  loggingOut (){
    this.dataEmployee.forEach((user) => {
      user.loginStatus = false;
    })
  }

  isDoctor (){
    let loggedInDoctor = this.dataEmployee.filter((user) => {
      return user.position == 'doctor' && user.loginStatus == true;
    })
    if (loggedInDoctor.length === 0){
      return false;
    } else {
      return true;
    }
  }
  
  addPatient (obj){
    let newPatient = new Patient (this.dataPatient[0].idCounter += 1, obj.name, obj.diagnosis)
    this.dataPatient.push(newPatient);
  }

}


module.exports = Hospital;