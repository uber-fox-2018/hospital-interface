class View {
    constructor(){

    }

    static showEmployee(name,role,length){
        console.log(`Save data success ${role} ${name} \n Total employee : ${length}`)
    }

    static showLogin(status){
        if (status === false){
            console.log(`other user is logged in`)
        } else {
            console.log(`logged in successfully`)
        }
    }

    static showLogOut(){
        console.log('logged out successfully')
    }

}


module.exports = View