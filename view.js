class View {
    constructor(){

    }

    static showEmployee(name,role,length){
        console.log(`Save data success ${role} ${name} \n Total employee : ${length}`)
    }

    static showLogin(status){
        if (status === true){
            console.log(`logged in successfully`)
        } else if (status===false) {
            console.log('wrong password or username')
        } else if (status === undefined) {
            console.log('other user is currently logged in')
        }
    }

    static showLogOut(){
        console.log('logged out successfully')
    }

    static showAddPatient(status){
        if (status === false){
            console.log('you dont have access to add patient')
        } else {
            console.log(`added patient successfully. total patients: ${status}`)
        } 
    }
}


module.exports = View