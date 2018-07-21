const Controller = require('./controller.js')
const View = require('./view.js')
var data = process.argv.slice(3)
var controller = new Controller
var command = process.argv[2]
// console.log(command)
// console.log(data)
if(command === 'register'){
    Controller.register(data)
}else if(command === 'login'){
    Controller.login(data)
}else if(command === 'help' || command === undefined){
    Controller.help()
}else if(command === 'addPatient'){
    Controller.addPatient(data)
}else if(command === 'logout'){
    Controller.logoutFeatures()
}


// baru sampai register, tetapi kurang kondisi
// baru sampai login, tapi kurang kondisi