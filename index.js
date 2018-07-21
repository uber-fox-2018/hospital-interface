const Controller = require('./controller.js')

const argv = process.argv
const execute = argv[2]
const input = argv.slice(3)
// console.log(input);

if (execute == 'register'){
    Controller.register_employee(input[0], input[1], input[2], input[3])
}else if (execute == 'login'){
    Controller.login_employee(input[0], input[1])
}else if (execute == 'logout'){
    Controller.logout_employee(input[0])
}else if (execute == 'addPatient') {
    Controller.addpatient()
}else{
    console.log(`Please follow command below :`);
    console.log(`- register <name> <position> <username> <password> (admin only)`)
    console.log(`- login <username> <password>`)
    console.log(`- logout <username>`)
    console.log(`- addPatient <patient_name> <diagnosis> (doctor only)`)
}