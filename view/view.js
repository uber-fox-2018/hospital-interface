class View {
    static showError(err){
        console.log(err);
    }

    static showRegistered(data,length){
        console.log(`Save data success ${data}. Total employee : ${length}`);
    }

    static showLogin(name,status){
        if (status == false) {
            console.log(`username / password wrong!`);
        }else {
            console.log(`user ${name} logged in succesfully`);
        }
    }

    static showPatients(data){
        if (data === null) {
            console.log(`tidak memiliki akses untuk add patients`);
        }else {
        console.log(`data pasien berhasil ditambahkan. Total data pasien : ${data}`);
        }
    }

    static showLogout(data){
        console.log(`${data} successfully logged out`);
    }
}

module.exports = View