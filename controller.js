const DataDealer = require("./model.js");
const DataViewer = require("./view.js");


class DataController{
	constructor(){
	}

	static greetUser(){
		let sessionInfo = DataDealer.loadLoginSessionInfo();
		DataViewer.startupGreetings(sessionInfo);
	}

	static loginTime(sessionInfo){
		DataViewer.loginHowLongAgo(sessionInfo);
	}

	static help(){
		let sessionInfo = DataDealer.loadLoginSessionInfo();
		DataViewer.mainHelp(sessionInfo);
	}

	static printMessage(strMsg){
		DataViewer.printMessage(strMsg);
	}

	static logout(){
		DataDealer.logout();
	}

	static login(username, password){
		if(!DataDealer.login(username, password)){
			DataViewer.printMessage("Invalid login");
		}
	}

	static addPatient(...params){
		let result = DataDealer.addNewPatient(params);
		if(typeof result === "string") this.printMessage(result);
	}

	static register(params){
		DataDealer.addNewEmployee(params);
	}
}

module.exports = DataController;