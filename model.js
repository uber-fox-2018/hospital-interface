class Patient {
  constructor(name, diagnosis, ) {
    // this.id = id;
    this.name = name;
    this.diagnosis = diagnosis;
  }

  addPatient(){
    let database = JSON.parse(fs.readFileSync("./patient.json"));

    if (database.length === 0) {
      this.id = 1;
    } else {
      this.id = database[database.length - 1].id + 1;
    }
    this.listName = data;
  }
}

class Employee {
  constructor(name, password, position) {
    this.name = name;
    this.password = password;
    this.position = position;
    this.loginStatus = false;

    // this.username = username;
  }
}

let fs = require("fs");

class Model {
  constructor(database) {
    this.patient = new Patient();
    this.database = database;

    // this.data=
  }

  static readFileDB(file, cb) {
    fs.readFile(file, (err, data) => {
      if (err) {
        throw err;
      } else {
        // console.log(data);

        let db = JSON.parse(data);
        // console.log(db);

        cb(db);
      }
    });
  }

  static writeFileDB(database, newData, cb) {
    fs.writeFile(database, newData, function(err, data) {
      if (err) throw err;
      cb("Register success");
    });
  }

  static m_register(username, password, position, cb) {
    let employee = new Employee(username, password, position);
    Model.readFileDB("./db.json", dataFile => {
      dataFile.push(employee);
      let newData = JSON.stringify(dataFile);
      Model.writeFileDB("./db.json", newData, () => {
        let info = `Save data success ${JSON.stringify(
          employee
        )}. Total employee : ${dataFile.length}`;
        cb(info);
      });
    });
  }

  static m_login(username, password, cb) {
    let info;
    Model.readFileDB("./db.json", dataFile => {
      let loginStatus = true;

      dataFile.filter(function(data) {
        if (data.loginStatus == true) {
          loginStatus = false;
          info = `user ${data.name} sedang login`;
        }
      });

      if (loginStatus) {
        let loginEffort = dataFile.filter(function(data) {
          if (data.name == username && data.password == password) {
            data.loginStatus = true;
          }
          return data.username;
          console.log(data);
        });

        if (username == undefined && password == undefined) {
          info = "false username or password";
        } else {
          info = `user ${username} has successfully logged in`;
        }
        let database = JSON.stringify(dataFile);
        Model.writeFileDB("./db.json", database, () => {});
        cb(info);
      } else {
        cb(info);
      }
    });
  }

  static m_addPatient(name, diagnosis, cb) {
    let info;
    Model.readFileDB("./db.json", dataFile => {
      let isDokter = false;
      dataFile.filter(function(data) {
        if (data.position == `dokter` && data.loginStatus==true) {
          isDokter = true;
        }else{
          info = `anda bukan dokter enyahlah`
        }        
      });
      if (isDokter == true) {
        let patient = new Patient(name, diagnosis);
        // let patient.addPatient()
        Model.readFileDB("./patient.json", dataFilePatient => {
          dataFilePatient.push(patient);
          let newData = JSON.stringify(dataFilePatient);
          Model.writeFileDB("./patient.json", newData, () => {
             info = `add patient success ${JSON.stringify(
              patient
            )}. Total patient : ${dataFilePatient.length}`;
            cb(info);
          });
        });
      }else{
        cb(info)
      }
    });
  }

  // static 
}

const model = new Model("./db.json");
// console.log(Model.m_login());
// console.log(Model.m_login(`adefs`, `123`));

module.exports = Model;

//---------------------------------------------------------//
