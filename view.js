class View {
    constructor() {}
    displayError(err) {
        console.log(`Oops! Something bad happened :(`);
        console.log(err);
    }
    displayRegisterSuccess(obj, total) {
        console.log(`${obj.position} ${obj.username} is saved.`);
        console.log(`Total employee: ${total}`);
    }
    displaySystemIsUsed(username) {
        console.log(`Can't login.`)
        console.log(`System currently in use by ${username}.`);
    }
    displayLoginCurrently() {
        console.log('You are already logged in.');
    }
    displayLoginFailed() {
        console.log(`Wrong username or password.`);
    }
    displayLoginSuccess(username) {
        console.log(`User ${username} logged in successfully.`);
    }
    displayNotLoggedIn() {
        console.log(`You are not logged in.`);
    }
    displayLogoutSuccess() {
        console.log(`Logged out.`)
    }
    displayNotAuthorized(command) {
        console.log(`You are not authorized to ${command}.`);
    }
    displayAddPatientSuccess(patientName, totalPatient) {
        console.log(`Patient ${patientName} data saved. Total patients: ${totalPatient}`);
    }
    displayDataIsEmpty(data) {
        console.log(`${data} can not be empty.`);
    }
    displayInvalidData(data) {
        console.log(`${data} is invalid.`);
    }
    displayHelp() {
        console.log(`$ node index login <username> <password> #login to system (1 user at a time)`);
        console.log(`$ node index logout #logout from system`);
        console.log(`$ node index register <username> <password> <position> #register employee to the system (admin only)`);
        console.log(`$ node index addPatient <patient_name> ...<diagnosis> #add a patient to the logged in doctor (doctor only)`);
    }
}

module.exports = View;