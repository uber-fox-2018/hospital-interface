class View {
    static help() {
        console.log("RUMAH SAKIT SETIA BINGIT");
        console.log("$_  node index help")
        console.log("$_  node index Employee")
        console.log("$_  node index Patient")
        console.log("$_  node index register <username> <password> <role> <firstname> Mlastname>")
        console.log("$_  node index addPatient <name> <disease 1> <disease 2> ... <disease n>")
        console.log("$_  node index login <username> <password>")
        console.log("$_  node index logout")
    }

    static DisplayEmployee(employeeData) {
        console.log("Daftar Data User");
        console.log(`========================================\n`);
        let users = employeeData;
        users.forEach(element => {
            console.log(`Id \t\t: ${ element.id }`);
            console.log(`Username \t: ${ element.username }`);
            console.log(`Role \t\t: ${ element.role }`);
            console.log(`------------------------------------`);
        });
    }

    static DisplayPatient(PatientData) {
        console.log("Daftar Data Pasien");
        console.log(`========================================\n`);
        let users = PatientData;
        users.forEach(element => {
            console.log(`Id \t\t: ${ element.id }`);
            console.log(`Username \t: ${ element.name }`);
            console.log(`Role \t\t: ${ element.disease.join(' - ') }`);
            console.log(`------------------------------------`);
        });
    }

    static Message(message) {
        console.log(message)
    }

}
module.exports = View;