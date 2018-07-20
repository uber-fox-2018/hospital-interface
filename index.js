const command = process.argv[2];
const input = process.argv.slice(3);
const Controller = require ('./controller');

let hospital = new Controller ();
hospital.do(command, input);