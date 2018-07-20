class View {
    constructor(){
    }
    static showAddData(result){
        console.log('save data success')
        console.log(result[result.length-1])
        console.log('Total employee :' + result.length)
    }
    static login(result){
        
        console.log(result)
    }

    static addPatient(result){
        console.log(result)
    }
}

module.exports = View
