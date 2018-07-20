class View{
    
    static showRegister(task,jumlahEmployee){
        console.log(`save data success {"name":${task.name}},"position":${task.position},"username":${task.username},"password":${task.password}. Total employee : ${jumlahEmployee}`)
    }

    static showLogin(result){
        if(result !== 'x'){
            console.log(`user ${result} login succesfully`)
        }else{
            console.log(`user/password wrong`)
        }
    }

    static showAdd(result){
        if(result !== 'x'){
            console.log(`data pasien berhasil ditambahkan. Total data pasien : ${result}`)
        }else{
            console.log(`tidak memiliki akses untuk add patient`);
        }
    }
}

module.exports = View