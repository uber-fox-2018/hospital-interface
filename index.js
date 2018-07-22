const Controller = require('./controller.js');
const argv = process.argv.slice(2)

let command = argv[0]
let username = argv[1]
let password = argv[2]
let role = argv[3]
let nama = argv[1]
let diagnosa = argv.slice(2)


if (command == 'employee') {
  Controller.readEmpFile()
}else if (command == 'patient') {
  Controller.readPatientFile()
}else if (command == 'register') {
  Controller.registerEmployee(username,password,role)
}else if (command == 'login') {
  Controller.loginEmployee(username, password)
}else if (command == 'addPatient') {
  Controller.addPatient(nama, diagnosa)
}else if (command == 'logout') {
  Controller.logutEmployee(username)
}