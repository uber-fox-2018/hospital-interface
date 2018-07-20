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
    this._data = null;
  }

  get data (){
    return this._data;
  }

  set data (newData){
    return this._data = newData;
  }

  readFile (path, cb){
    fs.readFile(path, 'utf8', (err, data) => {
      if (err){
        console.log(err.message);
      } else {
        this.data = JSON.parse(data);
        cb();
      }
    })
  }

  writeFile (path, data, cb){
    fs.writeFile (path, JSON.stringify(data), (err) => {
      if (err) {
        console.log(err.message)
      }
    })
  }

  addEmployee (empObj){
    let newEmp = new Employee (empObj.name, empObj.role, empObj.username,empObj.pass);
    this.data.push(newEmp);
  }

  isAnotherLoggedIn (){
    let loggedInUsers = this.data.filter((user) => {
      return user.loginStatus === true;
    })
    if (loggedInUsers.length === 0){
      return false;
    }
    return true;
  }

  passwordCheck (username, pass){
    let theUser = this.data.filter((user) => {
      return user.username == username && user.password == pass;
    })
    if (theUser.length === 0){
      return false;
    }
    return true;
  }
}


module.exports = Hospital;