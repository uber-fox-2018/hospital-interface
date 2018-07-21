function greeting(name) {
    console.log('Hello ' + name);
  }
  
  function processUserInput(callback) {
    var name = 'udin';
    callback(name);
  }

processUserInput(greeting);