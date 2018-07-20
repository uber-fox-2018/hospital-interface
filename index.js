let Control = require('./controller.js')
let control = new Control()

let command = process.argv[2]

if (command == 'register'){
 let userName = process.argv[3]
 let myPassword = process.argv[4]
 let myPosition = process.argv[5]
 control.registration_employee(userName,myPassword,myPosition)
}

else if(command == 'login'){
    let userName = process.argv[3]
    let myPassword = process.argv[4]
    control.login(userName,myPassword)
}

else if(command == 'addPatient'){
    let userName = process.argv[4]
    let jumlahPatient = process.argv[3]
    let namaPatient = process.argv[5]
    let diagnosa = process.argv.slice(5)
    control.addPatient(userName,userName,diagnosa)
}

else if(command == 'logout'){
    control.logout()
}

