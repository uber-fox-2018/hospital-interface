const fs = require('fs')
const chalk = require('chalk')

class Employee {
  constructor(name, username, position, password) {
    this.name = name
    this.username = username
    this.position = position
    this.password = password
    this.data = null
  }

  readFile(callback) {
    fs.readFile('./employee.json', 'utf-8', (err, dataEmployee) => {
      if (err) throw err;
      this.data = JSON.parse(dataEmployee)
      callback()
    })  
  }

  writeFileEmployee(data) {
    fs.writeFile('employee.json', JSON.stringify(data), (err) => {
      if(err) throw err
    })
  }

  register(userRegister, callback) {
    this.readFile(() => {
      if (this.data.length === 0) {
        var id = 1
      } else {
        id = this.data[this.data.length-1].id + 1
      }

      let newUser = {
        id: id,
        name: userRegister.name,
        username: userRegister.username,
        password: userRegister.password,
        position: userRegister.position,
        isLogin: false
      }

      let data = this.data
      data.push(newUser)
      this.writeFileEmployee(data)
      let dataLength = this.data.length
      callback(newUser, dataLength)
    })
  }

  login(userLogin, callback) {
    this.readFile(() => {
      let username = userLogin.username
      let password = userLogin.password
      
      this.data.map(user => {
        let checkUsername = user.username === username
        let checkPassword = user.password === password
        if (checkUsername && checkPassword) {
          user.isLogin = true
          callback(chalk.green(`User ${username} logged in successfully`))
        }
      })

      this.data.map(user => {
        let checkUsername = user.username === username
        let checkPassword = user.password === password
        if ((checkUsername && !checkPassword) || (checkPassword && !checkUsername)) {
          callback(chalk.red('Username or password wrong'))
        }
      })

      this.writeFileEmployee(this.data)
    })
  }

  logout(userLogout, callback) {
    this.readFile(() => {
      let username = userLogout.username
      this.data.map(logout => {
        if (logout.username === username && logout.isLogin === true) {
          logout.isLogin = false
          callback(`${username} success logout`)
        }
      })
      this.writeFileEmployee(this.data)
    })
  }
}

module.exports = Employee