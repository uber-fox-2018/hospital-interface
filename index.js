const Controller = require('./controller.js')

let argv = process.argv;

var command = argv.slice(2);

switch(command[0]){
    case 'read': {Controller.getData(Controller.getTemp);  break}
    case 'register': {Controller.getRegister(Controller.createRegister);  break} 
}
