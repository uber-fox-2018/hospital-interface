const fs = require('fs')

class Patient {
  
  static readData(cbDataPatient){
    fs.readFile('./patient.json', 'utf-8', (err,data) => {
        let dataPatient = JSON.parse(data)
        cbDataPatient(dataPatient)
    })
  }

  static writeData(dataPatient){
    fs.writeFile('./patient.json', JSON.stringify(dataPatient, null, 2), (err) => {
      
    })
  }

}

module.exports = Patient