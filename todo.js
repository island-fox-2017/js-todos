const {
  Controller
} = require('./controller.js')

const args = process.argv.splice(2);
let cons = new Controller()

cons.prog(args)
