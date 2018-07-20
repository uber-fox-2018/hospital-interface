const controller = require('./Controller/controller')
const argv = process.argv.slice(2)
const command = argv[0]
const input = argv
const Controller = new controller()

// Controller.startAll(()=> {

// })

if(command === undefined) {
    Controller.helpMenu()
} else if (command === 'help') {
    Controller.menu()
} else if(command === 'register') {
    if(input[1] !== undefined && input[2] !== undefined && input[3] !== undefined) {
        let username = input[1];
        let password = input[2];
        let role = input[3]
        Controller.registerEmployee(username, password, role)
    } else {
        Controller.menu()
    }
} else if (command === 'login') {
    if(input[1] !== undefined && input[2] !== undefined) {
        let username = input[1];
        let password = input[2];
        Controller.loginEmployee(username, password)
    } else {
        Controller.menu()
    }
} else if (command === 'addPatient') {
    if(input[1] !== undefined && input[2] !== undefined) {
        let patient = input[1]
        let diagnosis = input.slice(2)
        Controller.addPatient(patient, diagnosis)
    } else {
        Controller.menu()
    }
} else if(command === 'logout') {
    if(input[1] !== undefined) {
        let username = input[1]
        Controller.logoutEmployee(username)
    } else {
        Controller.menu()
    }
}