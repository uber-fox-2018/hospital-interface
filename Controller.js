const Model = require('./Model.js');
const View  = require('./View.js');

class Controller {
    constructor(perintah) {
        this.perintah = perintah;
        this.employee = [];
        this.patient = [];
        this.command();       
    }

    command() {
        if(this.perintah.length === 0 || this.perintah[0] == 'help') {
            this.help();
        } else if(this.perintah[0] == 'Employee') {
            this.Employee();
        } else if(this.perintah[0] == 'Patient') {
            this.Patient();
        } else if(this.perintah[0] == 'register') {
            this.register();
        } else if(this.perintah[0] == 'login') {
            this.login();
        } else if(this.perintah[0] == 'logout') {
            this.logout();
        } else if(this.perintah[0] == 'addPatient') {
            this.addPatient();
        }
    }

    Employee() {
        Model.ReadEmployee((data) => {
            View.DisplayEmployee(data)
        });
    }

    Patient() {
        Model.ReadPatient((data) => {
            View.DisplayPatient(data)
        });
    }

    addPatient() {
        Model.ReadEmployee((data) => {
            let docter = data.filter(e => {
                return e.login > false
            })
            if(docter[0].role == 'docter') {
                Model.ReadPatient( (dataPatient) => {
                    this.patient = dataPatient;

                    let id = dataPatient[dataPatient.length - 1].id + 1;
                    let calender = new Date;
                    let tgl = calender.toLocaleDateString();
                    let newPatient = {
                        "id": id,
                        "name": this.perintah[1],
                        "disease": [],
                        "createdAt": tgl
                    };

                    let disease = this.perintah.slice(2);
                    for(let i in disease) {
                        newPatient.disease.push(disease[i]);
                    }
                    this.patient.push(newPatient);
                    Model.addPatient(this.patient);
                    this.patient = [];
                })
            } else {
                console.log("Anda Bukan Dokter")
            }
        });
    }

    login(username = this.perintah[1], password = this.perintah[2]) {
        Model.ReadEmployee((data) => {
            let dataEmployee = data;
            var message = '';
            for(let i in dataEmployee) {
                if(dataEmployee[i].login == true && dataEmployee[i].username != this.perintah[1]) {
                    message = 'Maaf, Sedang ada user lain yang login';
                    this.logout()
                    break;
                } else if(dataEmployee[i].login == true && dataEmployee[i].username == this.perintah[1]) {
                    message = `Anda sedang login dengan user ${ this.perintah[1] }`;
                    break;
                } else if(username == dataEmployee[i].username && password == dataEmployee[i].password) {
                    this.employee = dataEmployee;
                    this.employee[i].login = true;
                    Model.registerEmployee(this.employee);
                    message = `Selamat datang ${ dataEmployee[i].username } `
                    this.employee = [];
                    break;
                } 
            } View.DisplayLogin(message);

        });
    }

    logout() {
        Model.ReadEmployee((data) => {
            let dataEmployee = data;
            for(let i in dataEmployee) {
                var message = '';
                if(dataEmployee[i].login == true) {
                    this.employee = dataEmployee;
                    this.employee[i].login = false;
                    Model.registerEmployee(this.employee);
                    message = `Anda berhasil logout ${ dataEmployee[i].username } `
                    View.DisplayLogin(message);
                    this.employee = [];
                }
            }
        });        
    }

    register() {
        Model.ReadEmployee((data) => {
            this.employee = data;
            let id = data[data.length - 1].id + 1;
            let calender = new Date;
            let tgl = calender.toLocaleDateString();
            let newEmployee = {
                "id": id,
                "username": this.perintah[1],
                "password": this.perintah[2],
                "role": this.perintah[3],
                "login": false,
                "first_name": this.perintah[4],
                "last_name": this.perintah[5],
                "createdAt": tgl
            };
            this.employee.push(newEmployee);
            Model.registerEmployee(this.employee);
            this.employee = [];
        });
    }

    help() {
        View.help()
    }
} // end class Controller
module.exports = Controller;