const Controller = require('./controller');

let args = process.argv.slice(2);
let command = args[0];
let options = args.slice(1);
let controller = new Controller();
switch(command) {
    case 'register':
        controller.register(options[0], options[1], options[2]);
        break;
    case 'login':
        controller.login(options[0], options[1]);
        break;
    case 'logout':
        controller.logout();
        break;
    case 'addPatient':
        controller.addPatient(options[0], options.slice(1));
        break;
    default:
        controller.help();
        break;
}
