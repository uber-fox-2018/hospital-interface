const command = process.argv[2];
const input = process.argv.slice(3);
const Controller = require ('./controller');

let hospital = new Controller ();

hospital.startAll(()=> {
  switch (command){
    case 'help':
    hospital.help();
    break;
    case 'register':
    hospital.register(input[0], input[1], input[2]);
    break;
    case 'login':
    hospital.login(input[0], input[1]);
    break;
    case 'addPatient':
    hospital.addPatient(input[0], input.slice(1));
    break;
    case 'logout':
    hospital.logout(input[0], input[1]);
    break;
    default:
    hospital.help();
  }
});