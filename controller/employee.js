const Model = require('../model/employee')
const view = require('../view/view')

class EmployeeController {
  constructor() {
    this.model = new Model();
    this._data = null;
  }

  showHelp() {
    view.showHelp()
  }

  register(name, username, position, password) {
    this.model.register(new Model(name, username, position, password), (message, total) => {
      view.messageSuccess(message, total)
    })
  }

  login(userLogin) {
    this.model.login(userLogin, (message) => {
      view.loginMessage(message) 
    })
  }

  logout(userLogout) {
    this.model.logout(userLogout, (message) => {
      view.logoutMessage(message)
    })
  }
}

module.exports = EmployeeController