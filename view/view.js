const chalk = require('chalk')

class View {
  static showHelp() {
    console.log(`
                                    Menu Help
      ============================================================================
      1. node index.js register [name] [username] [password] [position] [password]
      2. node index.js login [username] [password]
      3. node index.js addPatient [name] [diagnosis]
      4. node index.js logout [username]
      ============================================================================
                                 BY: Ari Supriatna
    `)
  }

  static messageSuccess(msg, total) {
    console.log(`Save data success {"username": "${msg.username}", "password": "${msg.password}", "role": "${msg.position}"}. Total Employe: ${total}`)
  }

  static loginMessage(userLogin) {
    console.log(userLogin)
  }

  static messagePatient(msg) {
    console.log(chalk.blue(msg))
  }

  static logoutMessage(msg) {
    console.log(chalk.cyan(msg))
  }
}

module.exports = View