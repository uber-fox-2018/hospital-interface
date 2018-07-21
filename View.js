class View {
    static help() {
        console.log("RUMAH SAKIT SETIA BINGIT");
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