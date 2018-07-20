class View {
  // static call(help){
  //     console.log(`please input help for more information`)
  // }
  // static info(){
  //     console.log('please add username/password')
  // }
  // static show(message){
  //     console.log(message)
  // }

  static v_help() {
    console.log("--------------------help-------------------");
    console.log("node index.js register [username] [pass] [role]");
    console.log("node index.js login [username] [pass]");
    console.log(
      "node index.js addPatient (ROLE MUST BE A DOCTOR!) [patient_name] [diagnosis]"
    );
    console.log("node index.js logout [username]");
  }

  static display(msg) {
    console.log(msg);
  }
}

module.exports = View;
