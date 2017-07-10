"use strict"
const Controller = require('./controllers')
let args = process.argv

class Todo {
  constructor() {
    this.controller = new Controller()
  }
}

let todo = new Todo()

todo.controller.run(args)
