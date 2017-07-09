'use strict'
const fs = require('fs');
const {Controller} = require("./controller.js")
class ToDo {
  constructor() {

  }
  penentuTugas(tugas, userInput) {
    let kirimTugas =  new Controller()
    if (tugas== 'add') {
      kirimTugas.tambahTask(userInput)
    }
    else if (tugas == 'list') {
      kirimTugas.toList()

    }
    else if (tugas == 'delete') {
      kirimTugas.toDelete(userInput)
    }
    else if(tugas == 'complete') {
      kirimTugas.toComplete(userInput)
    }
  }
}


var keepInput = process.argv;
var input = keepInput.slice(2,keepInput.length);
var task = input[0];
var arrayUserInput = input.slice(1, input.length)
var userInput = arrayUserInput.join(' ')
let todo = new ToDo()
todo.penentuTugas(task,userInput)

let controller = new Controller()

// console.log(controller.tambahTask('aku ga bisa panggil'));

module.exports = {
  ToDo
}
