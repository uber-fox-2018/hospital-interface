const input = process.argv.slice(2)
let Controller = require(`./controller.js`)

if (typeof input[0] === `undefined`) {
    Controller.help()
} else if (input[0] === `1`) {
    Controller.login(input[1], input[2])
} else if (input[0] === `2`) {
    Controller.logOut()
} else if (input[0] === `3`) {
    Controller.addEmployee(input[1], input[2], input[3])
} else if (input[0] === `4`) {
    Controller.employeeList()
} else if (input[0] === `5`) {
    Controller.addPatient(input[1], input[2], input[3])
} else if (input[0] === `6`) {
    Controller.seePatient()
} else {
    Controller.help()
}