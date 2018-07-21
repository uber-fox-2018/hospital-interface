const fs = require('fs');

class EmployeeModel {
  constructor(employess) {
    this._employee = employess;
  }

  set employee(data) {
    this._employee = data;
  }

  get employee() {
    return this._employee;
  }

  help() {
    const helpContent = [
      'node index.js', 
      'node index.js help',
      'node index.js register <username> <password> <role>', 
      `node index.js show employee`, 
      `node index.js show <username>`, 
      `node index.js show patient`, 
      'node index.js login <username> <password>',
      'node index.js logout'
    ];

    return helpContent;

  }

  showEmployees(employeeObj) {
    
  }

  register(username, password, role) {
    let employee = this._employee;
    let thereIs = false;
    let notification = '';
    
    if(!username || !password || !role) {
      notification = `fix yourself please!`;
    }
    else {
      for(let index = 0; index < employee.length; index++) {
        if(employee[index].username === username) thereIs = true;
      }
  
      if(!employee.length || !thereIs) {
        employee.push({
          username: username, 
          password: password, 
          role: role
        });
        notification = `Save data succes. `;
        notification += `Total employee: ${employee.length}`;
      }
      else {
        notification = `Username already exist`;
      }
  
      let employeeAdded = JSON.stringify(employee, null, 2);
      let overWrite = fs.writeFileSync('./employee.json', employeeAdded);  
      
    }

    return notification;  
    
  }

  drop(username, employeeObj) {
    let employees = this._employee;
    let thereIs = false;
    let output = [];
    let notification= '';
    for(let index = 0; index < employees.length; index++) {
      if(employees[index].username === username) thereIs = true;
    }

    if(!employees.length) {
      notification = `No data!`;
    }
    else if(!thereIs) {
      notification = `Username doesn't exist!`;
    }
    else {
      for(let index = 0; index < employees.length; index++) {
        let same = false;
        if(employees[index].username === username) same = true;
        if(!same) output.push(employees[index]);
      }
      
      let employeeUpdated = JSON.stringify(output, null, 2);
      let overWrite = fs.writeFileSync('./employee.json', employeeUpdated);
      
      notification = `Employee ${username.toUpperCase()} succesfully deleted.`;
      
    }
    
    return notification;

  }

  login(username, password) {   
    let employees = this._employee;
    let notification = '';
    if(!username) {
      notification = `Username is required`;
    } 
    else {
      if(!password) {
        notification = `Please type your password`;
      }
      else {
        // let employee = this._employee;
        let logged = false;
        let doctor = false;
        for(let i = 0; i < employees.length; i++) {
          let rightUsername = employees[i].username === username;
          let rightPassword = employees[i].password === password;
          if(rightPassword && rightPassword) {
            logged = true;
            if(employees[i].role === 'dokter') doctor = true;
          }
        }
        logged ? notification = `user ${username} logged in successfully` : notification = `username / password wrong`;

        // add patients as a doctor
        if(doctor) {
          // if() {

          // }
        }
        else {
          notification = `tidak memiliki akses untuk add patients!`;
        }
        
        
      }
    }

    return notification;

  }

}

module.exports = EmployeeModel;