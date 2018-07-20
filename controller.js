const Model = require ('./model');
const View = require ('./view');

class Hospital {
  constructor (){
    this._model = new Model ();
  }

  get model (){
    return this._model;
  }

  startAll (cb){
    this.model.readFilePatient(()=> {
      this.model.readFileEmployee(()=> {
        cb()
      })
    })
  }

  register (username, pass, role){
    let newEmp = {
      name: username,
      role: role,
      username: username,
      password: pass
    }
    this.model.addEmployee (newEmp);
    this.model.writeFile ('employees.json', this.model.dataEmployee, () => {
      View.added (newEmp, this.model.dataEmployee.length)
    });
  }

  login (username, pass){
    if(!this.model.isAnotherLoggedIn()){
      this.model.passwordCheck(username, pass, (result) => {
        if (result == true){
          this.model.loggingIn(username);
          this.model.writeFile('employees.json', this.model.dataEmployee, () => {
            View.display(`${username} logged in successfully`)
          });
        } else {
          View.display(`username / password is wrong`);
        }
      });
    } else {
      View.display(`another user still logged in. log him/her out first!`);
    }
  }

  logout(){
    this.model.loggingOut();
    this.model.writeFile('employees.json', this.model.dataEmployee, () => {
      View.display(`you logged out successfully`);
    });
  }

  addPatient(name, diagnosis){
    if(this.model.isDoctor){
      let newPatient = {
        name: name,
        diagnosis: diagnosis.join(', ')
      }
      this.model.addPatient(newPatient)
    } else {
      View.display(`youre not a doctor; you can't add patient!`);
    }
  }

  help() {
    View.help();
  }
}


module.exports = Hospital;