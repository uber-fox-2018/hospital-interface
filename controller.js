let Employee = require(`./model/employee.js`)
let Patient = require(`./model/patien.js`)
let View = require(`./view.js`)

class Controller {
    static help() {
        View.help()
    }
    static login(username, password) {
        Employee.read(username, password, null, (readableData) => {
            Employee.login(username, password, readableData, (logStatus, loggerName) => {
                if (logStatus === `success`) {
                    View.display(`\n> user ${loggerName} logged in succesfully!\n`)
                } else if (logStatus === `failed`) {
                    View.display(`\n> username / password wrong\n`)
                } else {
                    View.display(`\n> user ${loggerName} already logged in!\n  You need to logout first and login again!\n`)
                }
            })
        })
    }
    static logOut() {
        Employee.logout((statusLogout,username)=>{
            if (statusLogout) {
                View.display(`\n> username ${username} has been logout\n`)
            } else {
                View.display(`\n> you already logout\n`)
            }
        })
    }
    static employeeList() {
        Employee.read(null, null, null, (readableData)=>{
            for (let i = 0; i < readableData.length;i++) {
            delete readableData[i].password
            View.display(readableData[i])
            }
        })
    }
    static addEmployee(username, password, position) {
        Employee.read(username, password, position, (readableData)=>{
            Employee.write(username, password, position, readableData, (data)=>{
                View.display(`> adding new employee with username : ${data[data.length-1].username} , is SUCCESS !\n`)
                View.display(`> last added employee :`);
                View.display(data[data.length-1])
                View.display(`\n> total employee right now : ${data.length}`);  
            })
        })
    }
    static addPatient(id, name, diagnose) {
        Patient.listPatien(id, name, diagnose, (file)=>{
            Patient.addPatien(id, name, diagnose, file,(isADoctor,data)=>{
                if (isADoctor) {
                    View.display(`\n> adding new patient with username : ${data[data.length-1].name} , is SUCCESS !\n`)
                    View.display(`> last added patient :`);
                    View.display(data[data.length-1])
                    View.display(`\n> total patient right now : ${data.length}\n`); 
                } else if (typeof isADoctor === "undefined") {
                    View.display(`\n> You need to Log In first to add patien\n`);
                } else {
                    View.display(`\n> this account doesn't have access to add patien\n`) 
                }
            })
        })
    }
    static seePatient() {
        Patient.listPatien(null, null, null, (file)=>{
            View.display(file)
        })
    }
}

module.exports = Controller