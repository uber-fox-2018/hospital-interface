const Controller = require('./controller.js')
const command = process.argv[2]
var input1 = process.argv[3]
var input2 = process.argv[4]
var input3 = process.argv[5]
var input4 = process.argv[6]

if(command === 'register'){
    Controller.register(input1,input2,input3,input4)
}else if(command === 'login'){
    Controller.login(input1,input2)
}else if(command === 'addPatient'){
    var penyakit = []
    for(let i = 5; i<process.argv.length; i++){
        penyakit.push(process.argv[i])
    }
    Controller.addPatient(input1,input2,penyakit)
}