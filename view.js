class DataViewer{
	constructor(){
	}

	static printMessage(strMessage){
		console.log(strMessage);
	}

	static startupGreetings(sessionObj){
		this.printMessage(`Welcome, ${ !sessionObj[0] ? "User": sessionObj[0].username}`);
		this.loginHowLongAgo(sessionObj[0]);
	}

	static loginHowLongAgo(sessionObj){
		if(sessionObj){
			let howLongTheLogin = new Date() - new Date(sessionObj.date);
			let diffDays = Math.floor(howLongTheLogin/86400000);
			let diffHours = Math.floor((howLongTheLogin % 86400000)/3600000);
			let diffMins = Math.round(((howLongTheLogin % 86400000) % 3600000) / 60000);
			this.printMessage(`You logged in${diffDays? `${diffDays} Days`: ""} ${diffHours? ` ${diffHours} hours `:""}${diffMins? ` ${diffMins} minutes`:""}${(diffMins ===0?" sometime ":"")} ago`);
		}
	}

	static mainHelp(sessionObj){
		if(!sessionObj[0]){
			this.helpGeneral();
		}
		else if(sessionObj[0].position === "dokter"){
			this.helpLoggedInDoctor();
		}
		else{
			this.helpLoggedInUser();
		}
	}

	static helpGeneral(){
		this.printMessage("node index register <username> <password> <role:[dokter|admin|officeboy|receptionist]>");
		this.printMessage("node index login <username> <password>");
	}

	static helpLoggedInUser(){
		this.helpGeneral();
		this.printMessage("node index user");
		this.printMessage("node index logout");
	}

	static helpLoggedInDoctor(){
		this.helpLoggedInUser();
		this.printMessage("node index addPatient <nama pasien> <diagnosis>");
	}

	static printHelp(...callbacks){
		for(let callback of callbacks){
			callback();
		}
	}

	
}

module.exports = DataViewer;