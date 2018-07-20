const Model = require ('./model');
const View = require ('./view');

class Hospital {
  constructor (){
    this._model = new Model ();
  }

  get model (){
    return this._model;
  }

  do (command, inputArr){
    switch (command){
      case 'help':
      View.help();
      break;
      case 'register':
      this.register(inputArr[0], inputArr[1], inputArr[2]);
      break;
      case 'login':
      this.login(inputArr[0], inputArr[1]);
      break;
      default:
      View.help();
    }
  }

  register (username, pass, role){
    this.model.readFile('employees.json', () =>{
      let newEmp = {
        name: username,
        role: role,
        username: username,
        password: pass
      }
      this.model.addEmployee (newEmp);
      this.model.writeFile ('employees.json', this.model.data, View.added (newEmp, this.model.data.length));
    })
  }

  login (username, pass){
    
  }
}


module.exports = Hospital;