const View = require("./view.js");
const Model = require("./model.js");

class Controller{
    static showData(){
        Model.read(Controller.readHandler);
    }
    static readHandler(data){
        View.display(data)
    }

    static registration(username, password, role){
        let employeeObj = {username : username, password : password, role : role, isLoggin : false};
        Model.add(employeeObj, jsonData => {
            View.display(employeeObj, jsonData);
        })
    }

    static login(username, password){
        Model.checkLogin(username, password, result => {
            View.login(username, result);
        })
    }

    static addPatients(patientNum, patientName, diagnoses){
        let patientObj = {id : patientNum, name : patientName, diagnoses : diagnoses}
        Model.addPatient(patientObj, (patient,doctor) => {
            View.addPatient(patientObj, patient, doctor);
        })
    }

    static logoutUser(username){
        Model.logout(username, result => {
            View.logout(username, result);
        })
    }

    static help(){
        View.help();
    }

}
module.exports = Controller;