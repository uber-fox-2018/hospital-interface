const hospital = require('./model')
const View = require('./view')


class Controller{
    constructor(){
        this.Hospital = new hospital()
    }

    register(username, password, role){
        let that = this
        this.Hospital.register(username, password, role, function(){           
            View.showMessage(`save data succes ${JSON.stringify(that.Hospital.parsingEmployee[that.Hospital.parsingEmployee.length-1])}. Total employee : ${that.Hospital.parsingEmployee.length}`)
        })
    }

    static login(username,password){
        hospital.login(function(data){
            //cek jika ada yg usah login
            var status = true
            for(var i = 0; i < data.length;i++){
                if(data[i].loginStatus === true){
                    View.showMessage(`mohon maaf user lain sedang ada yang login, silakan tunggu beberapa saat`)
                    status = false
                }
            }

            if(status === true){
                for(var i = 0; i < data.length;i++){
                    if(data[i].username === username){
                        if(data[i].password == password){
                            hospital.updateLogin(data[i].username)
                            View.showMessage(`user ${username} logged in succesfully`)
                        }else{
                            View.showMessage(`username /password wrong`)
                        }
                    }
                }
            }

           
        })
    }

    static addPatient(name, diagnosis){
        hospital.readEmployee(function(data){
            for(var i = 0; i < data.length;i++){
                if(data[i].loginStatus === true){
                    if(data[i].role === 'dokter'){
                       hospital.addPatient(name,diagnosis,function(data){
                           
                           View.showMessage(`data pasien berhasil ditambahkan. total data pasien ${data.length}`)
                       })
                   }else{
                       View.showMessage(`tidak memiliki akses untuk menambahkan data`)
                   }
                }
            }
        })
    }

    static logout(){
        hospital.logout(function(data){
            View.showMessage(`${data.username}, you have logout`)
        })
    }
        
    
}



module.exports = Controller