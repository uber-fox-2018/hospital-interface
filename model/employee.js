let fs = require(`fs`)

class Employee {
  constructor(username, password, position,) {
    this.username = username
    this.password = password
    this.position = position
  }
  //READ DATAS
  static read(username=0, password=0, position=0, cb) {
    fs.readFile(`./employee.json`,(err, data) => {
      if (err) throw err;
      let file = JSON.parse(data)
      cb(file)
    })
  }
  //WRITE DATAS
  static write(username, password, position, readableData, cb) {
    let employee = new Employee(username, password, position)
    readableData.push(employee)
    let readyToWriteData = JSON.stringify(readableData)
    fs.writeFile(`./employee.json`,readyToWriteData,(err, data) => {
      if (err) throw err;
      cb(readableData)
    })
  }
  //LOGIN
  static login(username, password, readableData, cb) {
    fs.readFile(`./logstatus.json`,(err, dataLog) => {
      if (err) throw err;
      let fileLog = JSON.parse(dataLog)
      if (!fileLog[0]) {
        let logged = false
        let whoLoggedOn = ``
        for (let i = 0; i < readableData.length;i++) {
          if (readableData[i].username === username && readableData[i].password === password) {
            logged = true
            whoLoggedOn += readableData[i].username
            fileLog[0] = true
            fileLog[1] = readableData[i].username
            fileLog[2] = readableData[i].position
            delete readableData[i].password
            fileLog[3].push(readableData[i])
            let readyToWriteLogData = JSON.stringify(fileLog)
            fs.writeFile(`./logstatus.json`,readyToWriteLogData,(err, data) => {
              cb(`success`, whoLoggedOn)
            })
          }
        }
        if (!logged) {
          cb(`failed`)
        }
      } else {
        cb(undefined,fileLog[1])
      }
    }) 
  }
  //LOGOUT
  static logout(cb){
    fs.readFile(`./logstatus.json`,(err, data) => {
      if (err) throw err;
      let file = JSON.parse(data)
      if (file[0]) {
        let username = file[1]
        file[0] = false
        file[1] = " "
        file[2] = " "
        let readyToWriteLogData = JSON.stringify(file)
        fs.writeFile(`./logstatus.json`,readyToWriteLogData,(err, data) => {
          cb(true,username)
        })
      } else {
        cb(false)
      }
    })
  }
}
module.exports = Employee