class View {
  constructor() {

  }

  help(menu) {
    menu.forEach(element => {
      console.log(element)
    });

  }

  showEmployees(employeeObj) {
    console.log(employeeObj);
    console.log(employeeObj.length);
    
  }

  showPatients(showPatients) {
    console.log(showPatients);
    
  }

  register(employeeRegisted) {
    console.log(employeeRegisted);
  }

  drop(employeeDroped) {
    console.log(employeeDroped);
  }

  login(userLogIn) {
    console.log(userLogIn);
  }

  addPatient() {
    // console.log('yo');
    
  }

  logout() {
    
  }

}

module.exports = View;