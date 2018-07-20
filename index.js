const [ command, args1, args2, args3, args4 ] = process.argv.slice(2)
const [ ...patient ] = process.argv.slice(3)
const ControllerEmployee = require('./controller/employee')
const ControllerPatient = require('./controller/patient')
const controllerEmployee = new ControllerEmployee()
const controllerPatient = new ControllerPatient()

switch(command) {
  case 'register': {
    controllerEmployee.register(args1, args2, args3, args4)
    break
  }
  case 'login': {
    controllerEmployee.login({"username": args1, "password": args2})
    break
  }
  case 'addPatient': {
    controllerPatient.addPatient({"name": args1, "diagnosis": [...patient]})
    break
  }
  case 'logout': {
    controllerEmployee.logout({"username": args1})
    break
  }
  default: {
    controllerEmployee.showHelp()
  }
}