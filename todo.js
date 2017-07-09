"use strict"

const Controller = require('./controller');

let input = process.argv.slice(2, process.argv.length);
let filter = input[0].split(":");
// console.log(input);
//console.log(filter);
console.log(`▶︎ You are successfully running ✚ ${input[0]} ✚ command ◀︎`);
console.log(`▶︎ Output ↴`);
let controller = new Controller();
controller.run(input, filter);
