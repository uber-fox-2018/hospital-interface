const chalk = require("chalk");

class View{
    static display(employeeObj, dataPeople){
        if(dataPeople.length===0){
            console.log("no data"); 
        }else{
            console.log(`save data success: `, employeeObj, `. Total employee: ${dataPeople.length}`);
         
        }
    }

    static login(username, result){
        if(result===undefined){
            console.log(`user ${username} has already logged in`);
        }else if(result === 'false'){
            console.log("username / password salah");
        }else if(result === 'true'){
            console.log(`user ${username} logged in successfully`);
        }else{
            console.log(`Doctor ${result} is still logged in`);
        }
    }

    static addPatient(patientObj, result, doctor){
        if(result === false){
            console.log("tidak memiliki akses untuk add patients!")
        }else{
            console.log(`data patient berhasil ditambahkan oleh dokter ${doctor} . Total data pasien : ${result.length}`)
        }
    }

    static logout(username, result){
        if(!result){
            console.log(`You're not logged in, ${username}`);
        }else{
            console.log(`Goodbye, ${username}! See you again soon!`);
        }
    }

    static help(){
        console.log(chalk.cyan("======================================================================"));
        console.log("Welcome to 🏥  Hospital Cepat Sembuh! Here you can: \n")
        console.log(chalk.green("1) register <username> <password> <role>"));
        console.log(chalk.yellow("2) login <username> <password>"));
        console.log(chalk.magenta("3) logout username"));
        console.log("And...If a 'dokter' is logged in, he/she also can: ");
        console.log(chalk.blue("4) addPatient <number> <name> <illness_1> <illness_2> ... <illness_N>"));
        console.log(chalk.cyan("======================================================================"));
    }
}

module.exports = View;