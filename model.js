const fs = require ("fs");

class Patient{
    constructor(id, name, diagnose){
        this.id = id
        this.name = name
        this.diagnose = diagnose
    }
}

class Employee{
    constructor(username, password, role){
        this.username = username
        this.password = password
        this.role = role
    }

}

class Model{
    static register(username, password, role, cb){
        let newStaff = new Employee(username, password, role);
        let staffObj = Object.assign({},newStaff);
        cb(staffObj);
       
    }
    //read employee.json / patient.json and "returning" array of objects via callback
    static read(path, cbRead){
        fs.readFile(path, 'utf-8', function(err,peopleData){
            let jsonData = JSON.parse(peopleData);
            cbRead(jsonData); //data from employee.json OR patient.json
        })
    }
    
    //update employee.json / patient.json everytime new employee / new patient is added
    static write(path, fileContent, cb){
        fs.writeFile(path, fileContent, (err, data) => {
            cb(data)
        })
    }

    //add new employee
    static add(employeeObj,cb){
        Model.read("./employee.json", jsonData => { //1. Get the array of objects from employee.json first,then
            jsonData.push(employeeObj); //2. Push new employee (obj) to the array
            let fileContent = JSON.stringify(jsonData, null, 2) //3.Stringify the array of objects
            Model.write("./employee.json", fileContent, () => { }) //4. Update the employee.json
            cb(jsonData);//5.Get the updated length of the array to View total of staff later
        }) 
    }

    //validate user who want to log in
    static checkLogin(username, password, cb){
        Model.read("./employee.json", jsonData => {
          let filtered= jsonData.filter(data => data.username === username && data.password===password);
          let anyOnlineDoctor = jsonData.filter(data => data.role === 'dokter' && data.isLoggin===true);
            //if username & password don't match:
          if(filtered.length===0){
              cb('false')
            //if match: check whether he/she has logged in 
            //if user hasn't logged in:
          }else if(filtered[0].isLoggin===false){ 
            //check whether his/her role is 'dokter' and is there anyOnlineDoctor
            if(filtered[0].role === 'dokter' && anyOnlineDoctor.length===1){
                cb(anyOnlineDoctor[0].username)
            }else{
                filtered[0].isLoggin = true;
                let fileContent = JSON.stringify(jsonData, null, 2)
                Model.write("./employee.json", fileContent, () => { })
                cb('true')
            }
          }else{//if he/she has logged in, just 'return' undefined
            cb(undefined)
          }
        })
    }
    //add new patient ONLY by 'dokter'
    static addPatient(patientObj,cb){
         //1. check if the user is a doctor AND he/she is already logged in
        Model.read("./employee.json", jsonData => {
            let loggedInDokter = jsonData.filter(data => data.isLoggin === true && data.role === "dokter");
                //if there is no a logged in 'dokter', it means the logged in user is NOT a 'dokter'
                if(!loggedInDokter.length){
                    cb(false, false);
                //if there is a logged in 'dokter'
                }else{
                    Model.read("./patient.json", patientJson => { //1. Get the array of objects from patient.json first,then
                        if(!patientJson.length){ //if patient.json is empty
                            patientObj.id = 1; //ID starts from 1
                        }else{ // ID is the increment from the previous ID (auto increment)
                            let lastId = patientJson[patientJson.length-1].id;
                            patientObj.id = ++lastId;
                        }
                        patientJson.push(patientObj); //2. Push new patient (obj) to the array
                        let fileContent = JSON.stringify(patientJson, null, 2) //3.Stringify the array of objects
                        Model.write("./patient.json", fileContent, () => { }) //4. Update the patient.json 
                        cb(patientJson, loggedInDokter[0].username);//5.Get the updated length of the array to View total of patient and the logged-in doctor later
                    }) 
                }
        })
    }
    //logout user
    static logout(username,cb){
        Model.read("./employee.json", jsonData => {
            let isLoggin = jsonData.filter(data => data.username === username && data.isLoggin===true);
            if(!isLoggin.length){
                cb(false);
            }else{
                isLoggin[0].isLoggin = false;
                let fileContent = JSON.stringify(jsonData, null, 2) //3.Stringify the array of objects
                Model.write("./employee.json", fileContent, () => { }) //4. Update the patient.json 
                cb(true);
            }
        })
    }
}

module.exports = Model;


