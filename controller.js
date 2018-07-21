const Context = require('./model/context');
const View = require('./view');

class Controller {
    constructor() {
        this._context = new Context('./employees.json');
        this._view = new View();
    }

    register(username, password, position) {
        let validation;
        this._loginHandler(loggedInEmployee => {
            if (loggedInEmployee.position === 'admin') {
                validation = this._validateNewEmployee(username, password, position);
                if (validation.isValid) {
                    this._context.add(validation.validEmployeeData, (err, result, totalEmployee) => {
                        if (err)
                            this._view.displayError(err);
                        else
                            this._view.displayRegisterSuccess(result, totalEmployee);
                    });
                }
            }
            else
                this._view.displayNotAuthorized(this.register.name);
        });
    }

    login(username, password) {
        this._context.findLoggedInEmployee((isLogin, loggedInEmployee) => {
            if (isLogin)
                this._view.displaySystemIsUsed(loggedInEmployee.username);
            else {
                this._context.login(username, password, (isAuthorized, loggedInEmployee) => {
                    if (!isAuthorized)
                        this._view.displayLoginFailed();
                    else
                        this._view.displayLoginSuccess(loggedInEmployee.username);
                });
            }
        });
    }

    logout() {
        this._context.logout(isCurrentlyLogin => {
            if (!isCurrentlyLogin)
                this._view.displayNotLoggedIn();
            else
                this._view.displayLogoutSuccess();
        });
    }

    addPatient(name, diagnosis) {
        this._loginHandler(loggedInEmployee => {
            if (loggedInEmployee.position !== 'doctor')
                this._view.displayNotAuthorized(this.addPatient.name);
            else {
                let objPatient = { name: name, diagnosis: diagnosis }
                this._context.addPatient(loggedInEmployee.id, objPatient, (newPatient, totalPatient) => {
                    if (typeof newPatient === 'undefined')
                        this._view.displayAddPatientFailed();
                    else
                        this._view.displayAddPatientSuccess(newPatient.name, totalPatient);
                });
            }
        })
    }

    help() {
        this._view.displayHelp();
    }

    _validateNewEmployee(username = '', password = '', position = '') {
        let positions, isValid = true;
        positions = ['admin', 'receptionist', 'office boy', 'doctor'];

        if (username.trim().length === 0) {
            isValid = false;
            this._view.displayDataIsEmpty('username');
        }
        if (password.trim().length === 0) {
            isValid = false;
            this._view.displayDataIsEmpty('password');
        }
        if (!positions.includes(position)) {
            isValid = false;
            this._view.displayInvalidData('position');
        }

        return {
            isValid: isValid,
            validEmployeeData: {
                username: username,
                password: password,
                position: position
            }
        }
    }

    _loginHandler(callback) {
        this._context.findLoggedInEmployee((isLogin, loggedInEmployee) => {
            if (!isLogin)
                this._view.displayNotLoggedIn();
            else {
                callback(loggedInEmployee)
            }
        });
    }
}

module.exports = Controller;