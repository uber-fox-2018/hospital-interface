const ModelEmployee = require('./employeemodel.js');
const ModelPatient = require('./patientmodel.js');
const View = require('./view.js');

class Controller {
    static registerEmployee(name, position, username, password) {
        ModelEmployee.registerEmployee(name, position, username, password, (data) => {
            let output = `Registration successful! | Name: ${name} | Position: ${position} || Username: ${username}, Password: ${password} | Total employee(s): ${data[1]}`;
            View.displayMessage(output);
        })
    }

    static loginEmployee(username, password) {
        ModelEmployee.loginEmployee(username, password, (err, loginCheck) => {
            let strOutput = '';
            if (err === 'err') {
                strOutput = `User already logged in.`
            } else if (loginCheck) {
                strOutput = `User "${username}" logged in successfully!`
            } else if (!loginCheck) {
                strOutput = `Username/Password wrong!`;
            }
            View.displayMessage(strOutput);
        })
    }

    static addPatient(name, diagnosis) {
        
        ModelPatient.addPatient(name, diagnosis, (data, condition) => {
            // console.log('===', data);
            if (condition === true) {
                let output = `Patient registration successful! | Name: ${name} || Total patient(s): ${data[1]}`;
                View.displayMessage(output);
            } else {
                let output = `Access denied! Must be a doctor to add patients.`;
                View.displayMessage(output);
            }
        })
    }

    static logout() {
        ModelEmployee.logout(() => {
            let output = `You're now logged out. Thank you!`;
            View.displayMessage(output);
        })
    }

}

module.exports = Controller;