let fs = require(`fs`)

class Patient {
  constructor(id, name, diagnose) {
    this.id = id
    this.name = name
    this.diagnose = diagnose
  }
  //READ PATIEN DATAS
  static listPatien(id, name, diagnose, cb) {
    fs.readFile(`./patien.json`,(err, data)=>{
      if (err) throw err;
      let file = JSON.parse(data)
      for (let i = 0; i < file.length;i++) {
        for (let j = 0; j < file.length; j++) {
          if (file[i].id < file[j].id) {
            let temp = file[i].id
            file[i].id = file[j].id
            file[j].id = temp
          }
        }
      }
      cb(file)
    })
  }
  //WRITE DATAS
  static addPatien(id, name, diagnose, readableData, cb) {
    fs.readFile(`./logstatus.json`,(err, dataLogIn)=>{
      let fileLogIn = JSON.parse(dataLogIn)
      if (fileLogIn[2] === `doctor`) {
        let patien = new Patient(id, name, diagnose)
        readableData.push(patien)
        let dataReadyToWrite = JSON.stringify(readableData)
        fs.writeFile(`../patien.json`,dataReadyToWrite,(unreadedFile) => {
          cd(true,readableData)
        })
      } else if (fileLogIn[2] == ` `) {
        cb()
      } else {
        cb(false)
      }
    })
  }
}

let id = 4
let name = `asrul`
let diagnose = `ngantuk berat`

module.exports = Patient