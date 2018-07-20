const argv = process.argv.slice(2)
let command = argv[0]
let controller = require('./controller')
let Controller = new controller('./employee.json')

if(command === 'register'){
    var username = argv[1]
    var password = argv[2]
    var role = argv[3]
    Controller.register(username,password,role)
}else if(command === 'login'){
    var username = argv[1]
    var password = argv[2]
    controller.login(username, password)
}else if(command == 'addPatient'){
    var name = argv[1]
    var diagnosis = argv.slice(2)
    controller.addPatient(name, diagnosis)
}else if(command == 'logout'){
    controller.logout()
}
