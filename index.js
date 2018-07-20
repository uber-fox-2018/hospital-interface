const argv = process.argv.slice(2);
let command = argv[0];
// let username;
// let password;
// let position;
const Controller = require("./controller");

let controller = new Controller();

switch (command) {
  case undefined || "help":
    controller.c_help();
    break;

  case "register":
    username = argv[1];
    password = argv[2];
    position = argv[3];
    Controller.c_register(username, password, position);
    break;
  case "login":
    username = argv[1];
    password = argv[2];
    Controller.c_login(username, password);
    break;

  case "addPatient":
    name = argv[1];
    data = argv.slice(2);
    diagnosis = data.join(",");
    console.log(argv,diagnosis);

    Controller.c_addPatient(name, diagnosis);
    break;

  case "logout":
    Controller.c_logout(username);
    break;

}
