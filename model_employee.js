let fs = require('fs')

class Employee {
  constructor(id, name, position, username, password) {
    this.name = name
    this.position = position
    this.username = username
    this.password = password
    this.id = id
    this._namaFile = './employee.json'

  }

  write(data, cb) {
    fs.writeFile('./employee.json', data, (err, hasildata) => {

      cb(hasildata)
    })

  }

  writePatient(data, cb) {
    fs.writeFile('./patient.json', data, (err, hasildata) => {

      cb(hasildata)
    })
  }

  read(data, cb) {
    fs.readFile(data, 'utf8', (err, read_data) => {
      let file_data = JSON.parse(read_data)
      cb(file_data)
    })
  }

  add(add_data, cb) {
    this.read('employee.json', objJson => {
      objJson.push(add_data)
      cb(objJson)
      let stringJson = JSON.stringify(objJson, null, 2)
      this.write(stringJson, () => { })
    })
  }

  login(username, password, cb) {

    this.read('./employee.json', objJson => {

      objJson.forEach(element => {
        if (element.user_name == username) {

          if (element.my_password == password) {
            element.status_login = true
            cb('user ' + username + ' logged in successfully')
          }
          else {
            cb('username or password wrong')
          }
        }
      });
      let stringJson = JSON.stringify(objJson, null, 2)
      this.write(stringJson, () => { })
    })

  }

  logout(){

    this.read('./employee.json',objJson =>{
      objJson.forEach(element => {
        if(element.status_login == true){
          element.status_login = false
        }
      });
      let stringJson = JSON.stringify(objJson, null, 2)
      this.write(stringJson,()=>{})
    })
  }

  addPatient(userName, namaPatient, diagnosa, cb) {
    this.read('./employee.json', objJson => {
      objJson.forEach(element => {
        if (element.status_login == true) {
          if (element.role == 'doctor') {
            this.read('./patient.json', objJson_patient => {
              //console.log(typeof objJson_patient)
              let patient = { nama_patient: namaPatient, diagnosa: diagnosa ,id : objJson_patient.length+1}
              objJson_patient.push(patient)
              cb('data patient berhasil ditambahkan. Total data patient: ' + objJson_patient.length)
              let stringJson = JSON.stringify(objJson_patient, null, 2)
              this.writePatient(stringJson, () => { })
            })
            //

          }
          else {
            cb('tidak memiliki akses untuk add patients')
          }
        }
      });
    })

  }
}

module.exports = Employee

