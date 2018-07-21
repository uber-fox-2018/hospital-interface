class View {
    static help() {
        console.log(`> HELP FEATURES :\n`)
        console.log(`> type : help or blank input`)
        console.log(`  for  : to this page\n`)
        console.log(`> type : 1 [username] [password]`)
        console.log(`  for  : login\n`)
        console.log(`> type : 2`)
        console.log(`  for  : logout\n`)
        console.log(`> type : 3 [username] [password] [role]`)
        console.log(`  for  : add new employee\n`)
        console.log(`> type : 4`)
        console.log(`  for  : see all employee datas\n`)
        console.log(`> type : 5 [id] [name] [diagnose]`)
        console.log(`  for  : add new patient (Doctor Only)\n`)
        console.log(`> type : 6`)
        console.log(`  for  : see all patient datas\n`)
    }
    static display(data) {
        console.log(data)
    }
}
module.exports = View