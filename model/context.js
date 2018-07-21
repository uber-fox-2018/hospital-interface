const fs = require('fs');
const EmployeeFactory = require('./employee_factory')
const Patient = require('./patient');

class Context {
  constructor(fileName) {
    this._file_name = fileName || '';
  }

  list(callback) {
    this._parse((err, employees) => {
      callback(employees);
    });
  }

  find(idToBeFound, callback) {
    this.list(employees => {
      let foundEmployee = undefined;
      for (let employee of employees) {
        if (idToBeFound === employee.id) {
          foundEmployee = employee;
          break;
        }
      }
      callback(foundEmployee);
    });
  }

  add(newEmployeeObj, callback) {
    this.list((employees) => {
      let lastId = employees.length === 0 ? 0 : employees[employees.length - 1].id;
      let newEmployee = EmployeeFactory.create(newEmployeeObj.username, newEmployeeObj.password, newEmployeeObj.position);
      newEmployee.id = ++lastId;

      employees.push(newEmployee);

      this._save(employees, (err) => {
        callback(err, newEmployee, employees.length);
      });
    });
  }

  update(updatedEmployee, callback) {
    this.list((employees) => {
      let result = null;
      for (let i in employees) {
        if (updatedEmployee.id === employees[i].id)
          employees[i] = updatedEmployee;
        result = updatedEmployee;
        break;
      }

      this.save(employees, (err) => {
        callback(err, result);
      });

    });
  }

  delete(id, callback) {
    this.list((employees) => {
      let deletedEmployee = undefined;
      for (let i in employees) {
        if (id === employees[i].id) {
          deletedEmployee = employees[i];
          employees.splice(i, 1);
          break;
        }
      }

      this.save(employees, (err) => {
        callback(err, deletedEmployee);
      });

    });
  }

  findLoggedInEmployee(callback) {
    this.list(employees => {
      let loggedInEmployee, isLogin = false;
      for (let employee of employees) {
        if (employee.isLogin) {
          isLogin = true;
          loggedInEmployee = employee;
          break;
        }
      }
      callback(isLogin, loggedInEmployee);
    });
  }

  login(username, password, callback) {
    let loggedInEmployee, isAuthorized = false;
    this.list(employees => {
      for (let employee of employees) {
        if (employee.username === username &&
          employee.password === password) {
          isAuthorized = true;
          employee.isLogin = true;
          loggedInEmployee = employee;
          break;
        }
      }
      this._save(employees, err => {
        callback(isAuthorized, loggedInEmployee);
      });
    });
  }

  logout(callback) {
    let isCurrentlyLogin = false;
    this.list(employees => {
      for (let employee of employees) {
        if (employee.isLogin) {
          isCurrentlyLogin = true;
          employee.isLogin = false;
          break;
        }
      }
      this._save(employees, err => {
        callback(isCurrentlyLogin);
      });
    });
  }

  addPatient(doctorId, objPatient, callback) {
    let lastId, newPatient, totalPatient;
    this.list(employees => {
      for(let employee of employees) {
        if(employee.id === doctorId) {
          lastId = employee.patients.length === 0 ? 0 : employee.patients[employee.patients.length-1].id;
          newPatient = new Patient(++lastId, objPatient.name, objPatient.diagnosis);
          employee.patients.push(newPatient);
          totalPatient = employee.patients.length;
        }
      }
      this._save(employees, err => {
        callback(newPatient, totalPatient);
      });
    });
  }

  _parse(parseHandler) {
    this._read((err, jsonString) => {
      let jsonObjects, employees = [];
      jsonObjects = JSON.parse(jsonString);
      jsonObjects.forEach(obj => {
        let employee = EmployeeFactory.assign(obj);
        employees.push(employee);
      });
      parseHandler(err, employees);
    });
  }

  _save(employees, saveHandler) {
    let jsonString = JSON.stringify(employees, null, 2);
    this._write(jsonString, (err) => {
      saveHandler(err);
    });
  }

  _read(readHandler) {
    fs.readFile(this._file_name, 'utf8', (err, jsonString) => {
      readHandler(err, jsonString);
    });
  }

  _write(jsonString, writeHandler) {
    fs.writeFile(this._file_name, jsonString, (err) => {
      writeHandler(err);
    });
  }
}

module.exports = Context;


