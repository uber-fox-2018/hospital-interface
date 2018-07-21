class View{
    static displayAddEmployee(newEmployee,totalEmployee){
        console.log(`Selamat ${newEmployee.role} ${newEmployee.username} telah di daftarkan`)
        console.log(`Total employee : ${totalEmployee}`)
    }
    static displayCantRegister(newEmployee){
        console.log(`${newEmployee} sudah terdaftar, masukkan username yang lain`)
    }
    static displayLogin(dataLogin){
        console.log(`user ${dataLogin.username} logged in successfully`)
    }
    static passwordSalah(){
        console.log(`username / password salah`)
    }
    static adaYangLogin(dataLogin){
        console.log(`username ${dataLogin.username} sudah login`)
    }
    static help(help){
        console.log(`node index.js ${help}`)
    }
    static kurangDataRegister(){
        console.log(`node index.js register <USERNAME> <PASSWORD> <POSITION>`)
    }
    static patientAdded(data){
        console.log(`pasien ${data[data.length-1].name} telah di tambahkan, total data pasien : ${data.length-1}`)
    }
    static notAllowed(){
        console.log('tidak memiliki akses untuk add patient')
    }
    static belumLoginTapiSudahLogout(){
        console.log(`login terlebih dahulu jika ingin menggunakan fitur logout`)
    }
    static logout(employeeLogout){
        console.log(`${employeeLogout.role} ${employeeLogout.username} berhasil logout`)
    }
}

module.exports = View