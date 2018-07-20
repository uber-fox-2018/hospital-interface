class Hospital {

  static help (){
    console.log('node index.js help');
    console.log('node index.js register <username> <password> <position>');
    console.log('node index.js login <username> <password>');
    console.log('node index.js addPatient <name> <diagnose(s)>');
    console.log('node index.js logout');
  }

  static added (empObj, length){
    console.log(`${JSON.stringify(empObj)} saved succesfully. Total employee: ${length}`);
  }

  static display(message){
    console.log(message);
  }
}

module.exports = Hospital;