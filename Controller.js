const Model = require('./Model.js');
const View  = require('./View.js');

class Controller {
    constructor(perintah) {
        this.perintah = perintah;
        this.employee = [];
        this.command();       
    }

    command() {
        if(this.perintah.length === 0 || this.perintah[0] == 'help') {
            this.help();
        } else if(this.perintah[0] == 'read') {
            this.read();
        } else if(this.perintah[0] == 'register') {
            this.register();
        } else if(this.perintah[0] == 'login') {
            this.login();
        } else if(this.perintah[0] == 'logout') {
            this.logout();
        }
    }

    read() {
        Model.ReadEmployee((data) => {
            View.DisplayEmployee(data)
        });
    }

    login(username = this.perintah[1], password = this.perintah[2]) {
        Model.ReadEmployee((data) => {
            let dataEmployee = data;
            for(let i in dataEmployee) {
                var message = '';
                if(dataEmployee[i].login == true) {
                    message = 'Maaf, Sedang ada yang login'
                    View.DisplayLogin(message);
                } else if(username == dataEmployee[i].username && password == dataEmployee[i].password) {
                    this.employee = dataEmployee;
                    this.employee[i].login = true;
                    Model.registerEmployee(this.employee);
                    message = `Selamat datang ${ dataEmployee[i].username } `
                    View.DisplayLogin(message);
                    this.employee = [];
                }
            }
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