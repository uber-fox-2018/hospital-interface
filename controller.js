const Model = require('./model.js');
const View = require('./view.js');


class Controller {

    static getData(callback) {
        //callback isi dengan method yang membutuhkan temp data
        Model.read(callback);
    }

    static getRegister(employInfo, callback) {

    }

    static haii() {

    }

    static createRegister(employinfo, tempData) {
        var temp = tempData;
        console.log(employinfo);
        console.log(temp);
    }

    static getTemp(tempData) {
        var temp = tempData;
        View.view(temp);

    }

}




module.exports = Controller;