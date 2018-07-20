const Model = require("./model");
const View = require("./view");

class Controller {
  constructor() {
    this.model = new Model();
    this.view = new View();
  }

  static c_register(username, password, position) {
    Model.m_register(username, password, position, msg => {
      View.display(msg);
    });
  }

  static c_login(username, password) {
    Model.m_login(username, password, msg => {
      View.display(msg);
    });
  }
  static c_addPatient(name, diagnosis) {
    Model.m_addPatient(name, diagnosis, msg => {
      View.display(msg);
    });
  }

  static c_logout(username) {
    Model.m_logout(username, msg => {
      View.display(msg);
    });
  }
}
module.exports = Controller;
