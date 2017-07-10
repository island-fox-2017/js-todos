"use strict"

const Controller = require('./controller')

// Driver code
let arg = process.argv.slice(2, process.argv.length);
let controller = new Controller();
controller.run(arg);
