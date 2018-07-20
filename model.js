const fs = require("fs");
const DataController = require("./controller.js");

class Patient {
	constructor(id, name, diagnosis) {
		this.id=id;
		this.name = name;
		this.diagnosis = diagnosis;
	}
}
  
class Employee {
	constructor(id, username, password, position) {
		this.id = id;
		this.name =  username;
		this.position = position || "staff";
		this.username = username;
		this.password = password;
	}
}

class LoginSession{
	constructor( username, position, date ){
		this.username = username;
		this.position = position;
		this.date = date || new Date();
	}
}

class DataDealer{
	constructor(){
	}

	static parseData(fileDir, EndFormClass){
		let rawData = JSON.parse(fs.readFileSync(fileDir, "utf8").toString());
		rawData = rawData.map(ObjLiteral => {
			let transformedObj = new EndFormClass();
			Object.assign(transformedObj, ObjLiteral);
			return transformedObj;
		});
		return rawData;
	}

	static saveData(fileDir, arrOfObjToSave, messageToPrint){
		fs.writeFile(fileDir,JSON.stringify(arrOfObjToSave, null, 2), (err)=>{
			if(err) throw err;
			console.log(messageToPrint);
		});
		
	}

	static addNew(fileDir, EndFormClass, newObjParameters){
		let dataToBeAdded = this.parseData(fileDir, EndFormClass);
		let id = dataToBeAdded.length;
		dataToBeAdded.push(new EndFormClass(id,...newObjParameters));
		this.saveData(fileDir, dataToBeAdded, "Save Data Success");
		return dataToBeAdded.length;
	}

	static addNewEmployee(paramForEmployee){
		return this.addNew("./employee.json", Employee, paramForEmployee);
	}

	static addNewPatient([nama, ...diagnosis]){
		let loginSession = this.loadLoginSessionInfo();

		if(!loginSession || loginSession[0].position !== "dokter"){
			return "Anda tidak memiliki akses untuk menambah data pasien.";
		}
		else{
			return this.addNew("./patient.json", Patient, [nama, diagnosis]);
		}
	}

	//LOGIN RELATED
	static login(username, password){
		let currentSession  = this.loadLoginSessionInfo();
		if(currentSession) DataController.printMessage("Logging out from existing session...");
		let employeeData = this.parseData("./employee.json", Employee);
		for(let employee of employeeData){
			if(employee.username === username && employee.password === password){
				this.saveData("./loginSession.json",[new LoginSession(employee.username, employee.position)],`${employee.username} logged in Successfully`);
				return true;
			}
		}
		return false;
	}

	static logout(){
		return this.saveData("./loginSession.json", [], "Logged out successfully");
	}

	static loadLoginSessionInfo(){
		let infoSession = this.parseData("./loginSession.json",LoginSession);
		return (infoSession.length ? infoSession : false);
	}


}

//let param = ["eri2",  "1234566", "admin"];
//DataDealer.addNew("./employee.json", Employee, param);
//DataDealer.logout();
//console.log(DataDealer.loadLoginSessionInfo());
//console.log(DataDealer.login("joanlamrack", "12345"));

//let param = ["daniel", "batuk", "pilek", "demam"];
//DataDealer.addNewPatient(param);

//console.log(DataDealer.isLoginValid("joanlamrack", "12345"));
//console.log(DataDealer.loadLoginSessionInfo());
//DataDealer.logout();
module.exports = DataDealer;