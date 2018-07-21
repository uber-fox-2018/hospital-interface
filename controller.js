const model = require('./model.js')
const view = require('./view.js')
var employee = new model.employee
var patient = new model.patient
class Controller {
    static addEmployee(oldData,fileRegister){
        // console.log(2)
        var checkUsername = true
        for(let i = 0 ; i < oldData.length ; i++){
            if(oldData[i].username === fileRegister.username){
                checkUsername = false
            }
        }
        if(checkUsername === false){
            view.displayCantRegister(fileRegister.username)
        }else{
            model.model.addEmployee(oldData,fileRegister)
        }
        
    }
    static register(fileRegister){
        if(fileRegister.length === 3){
            fileRegister = {username:fileRegister[0],password:Number(fileRegister[1]),role:fileRegister[2],loginStatus:false}
            model.model.readFile(this.addEmployee,fileRegister)
            // console.log('test')
        }else if(fileRegister.length < 3){
            view.kurangDataRegister()
        }
        
    }
    static checkStatusLogin(data,dataLogin){
        var checkLogin = false // kondisi false kalau username/password salah
        var adaYangLogin = false // kondisi false kalau tidak ada user lain yang login
        var dataPeople = null
        for(let i = 0 ; i < data.length ; i++){
            if(data[i].loginStatus === true){ // kalau ada user lain yang login
                adaYangLogin = true
                dataPeople = data[i]
            }
            if(data[i].username === dataLogin.username && data[i].password === dataLogin.password && data[i].loginStatus === false){ // kalau login data match sama database dan offline
                data[i].loginStatus = true
                checkLogin = true
            }
            
        }
        if(checkLogin === true && adaYangLogin === false){
            model.model.changeStatusLogin(data,dataLogin)
        }else if(adaYangLogin === true && checkLogin === true || adaYangLogin === true && checkLogin === false){
            view.adaYangLogin(dataPeople)
        }else{
            view.passwordSalah()
        }

    }
    static login(data){
        var dataLogin = {username:data[0],password:Number(data[1])}
        model.model.checkStatus(this.checkStatusLogin,dataLogin)
    }
    static help(){
        var commands = ['help','register <Username> <Password> <Position>','login <Username> <Password>','addPatient <PatientName> <Diagnosis Psatient>','logout']
        for(let i = 0 ; i < commands.length ;i++){
            view.help(commands[i])
        }
    }
    static addId(dataPasien,dataEmployee){
        dataPasien[dataPasien.length-1].id = dataPasien.length-1
        var dokterOnline = false
        for(let i = 0 ; i < dataEmployee.length ; i++){
            if(dataEmployee[i].role === 'dokter' && dataEmployee[i].loginStatus === true){
                dokterOnline = true
            }
        }
        if(dokterOnline === true){
            model.model.updatePatientData(dataPasien)
        }else{
            view.notAllowed()
        }
    }
    static addPatient(data){
        var diagonsa = data.slice(1)
        var patientData = {id:null,name:data[0],dianogsa:diagonsa}
        model.model.getDataPatient(patientData,this.addId)
    }
    static logoutFeatures(){
        model.model.readFile(this.changeLoginStatus, '')
    }
    static changeLoginStatus(employee){
        var check = false
        var employeeLogout = null
        for(let i = 0 ; i < employee.length ; i++){
            if(employee[i].loginStatus === true){
                check = true
                employee[i].loginStatus = false
                employeeLogout = employee[i]
            }
        }
        if(check === true){
            model.model.UpdateLoginStatus(employee,employeeLogout)
        }else{
            view.belumLoginTapiSudahLogout()
        }
    }
}

module.exports = Controller