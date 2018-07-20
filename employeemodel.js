const fs = require('fs');

class Employee {
    constructor(name, position, username, password) {
        this.name = name
        this.position = position
        this.username = username
        this.password = password
        this.loginStatus = false
    }

    static readDataEmployee(callback) {
        fs.readFile('./employees.json', 'utf8', (err, data) => {
            if (err) throw err
            callback(JSON.parse(data));
        })
    }

    static writeDataEmployee(dataSaved, callback) {
        fs.writeFile('./employees.json', JSON.stringify(dataSaved), (err) => {
            if (err) throw err
            callback();
        })
    }

    static registerEmployee(name, position, username, password, callback) {
        Employee.readDataEmployee((employeeData) => {
            let employee = new Employee(name, position, username, password);
            if (employeeData == 0) {
                employee.id = 1; 
            } else {
                employee.id = employeeData[employeeData.length - 1].id + 1;
            }
            employeeData.push(employee);
            // console.log('----', employeeData);
            let data = employeeData.length;
            // let result = JSON.stringify(employeeData);
            var output = [employee, data];  
            Employee.writeDataEmployee(employeeData, function () {
                callback(output);
            });
        })
    }

    static loginEmployee(username, password, callback) {
        Employee.readDataEmployee((employeeData) => {
            let isGoing = null; //no one logged in yet
            for (let i = 0; i < employeeData.length; i++) {
                if (employeeData[i].username == username 
                    && employeeData[i].password == password) {
                    if (employeeData[i].loginStatus === true) { //someone's logged in
                        isGoing = false; 
                        break;
                    } else {
                        employeeData[i].loginStatus = true
                        isGoing = true;
                        break;
                    }
                } 
            }

            if (isGoing === null) { 
                return callback(null, false); //login false bcoz no one has logged in
            }
            if(!isGoing) { 
                return callback('err', null);
            } else if (isGoing) {
                Employee.writeDataEmployee(employeeData, (err) => {
                    if (err) throw err
                    // employeeData.loginStatus = true;
                    callback(null, true);
                    // return
                })
            }
        })
    }

    static logout(callback) {
        Employee.readDataEmployee((employeeData) => {
          for (let i = 0; i < employeeData.length; i++) {
            if (employeeData[i].loginStatus === true) {
              employeeData[i].loginStatus = false;
              Employee.writeDataEmployee(employeeData, function () {
                callback();
              })
            }
          }
        })
      }
}


module.exports = Employee;
