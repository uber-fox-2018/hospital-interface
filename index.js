const Controller = require('./controller.js');

let argv = process.argv;
let command = argv[2];
let input = argv.slice(3);

if (command == 'register') {
    Controller.registerEmployee(input[0], input[2], input[0], input[1]);
} else if (command == 'login') {
    Controller.loginEmployee(input[0], input[1]);
} else if (command == 'addPatient') {
    Controller.addPatient(input[0], input.slice(1));
} else if (command == 'logout') {
    Controller.logout();
}