const Controller = require('./controller/controller')
const argv = process.argv

class Index {
    constructor(){
        this.controller = new Controller()
    }

    choose(){
        let command = argv[2]
        if (command === 'register') {
            let username = argv[3]
            let password = argv[4]
            let position = argv[5]
            this.controller.register(username,password,position)
        }else if (command === 'login') {
            let username = argv[3]
            let password = argv[4]
            this.controller.login(username,password)
        }else if (command === 'addPatient') {
            // let id = argv[3]
            let patient = argv[3]
            let diagnosa = argv.slice(4)
            this.controller.addPatient(patient,diagnosa)
        }else if (command === 'logout') {
            let username = argv[3]
            this.controller.logout(username)
        }
    }
}

let hospital = new Index()
hospital.choose()