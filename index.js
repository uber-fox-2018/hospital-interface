// const controller = require('../hospital-interface/controller/controller');
const fs = require('fs');
const argv = process.argv.slice(2);
const command = argv[0];

const employeeData = fs.readFileSync('./employee.json', 'utf8');
const employeeObj = JSON.parse(employeeData);

const patientData = fs.readFileSync('./patient.json', 'utf8');
const patientObj = JSON.parse(patientData);

const controller = require('./controller');
const anyControll = new controller(employeeObj, patientData);

if(!command) {
  console.log(`Type 'node index.js help' please.`);
} 
else if(command === 'help') {
  anyControll.help()
}
else if(command === `show employees`) {
  anyControll.showEmployees(employeeObj);
}
else if(command === `show patients`) {
  anyControll.showPatients(patientObj);
}
else if(command === 'register') {
  let username = argv[1];
  let password = argv[2];
  let role = argv[3];
  anyControll.register(username, password, role);
} 
else if(command === 'drop') {
  let username = argv[1];
  anyControll.drop(username);
}
else if(command === 'login') {
  let username = argv[1];
  let password = argv[2];
  anyControll.login(username, password)
} 
else if(command === 'addPatient') {
  let patientName = argv[1];
  let diagnosis = argv[2];
  anyControll.addPatient(patientName, diagnosis);
}

else if(command === 'logout') {
  anyControll.logout();
}















































































// const data = (employee) => {
//   fs.readFile('employee.json', 'utf8', (err, data) => {
//     let dataObject = JSON.parse(data);
//     callback(dataObject);
//   });

// }


// function callback(dataObject) {
//   console.log(dataObject);
// }

// data();