const Controller = require('./Controller.js');
const perintah = process.argv.slice(2);

// console.log(perintah.length)
let cmd = new Controller(perintah);