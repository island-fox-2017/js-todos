'use strict'

const View = require('./view');
const Model = require('./model');
const todoModel = Model.TodoModel;

class TodoController {
  constructor(file) {
    this.view = new View();
    this.model = new todoModel(file);
  }

  processor(input) {
    let command = input[0];
    let param = input[1];

    switch (command) {
      case 'help':
        this.processHelp();
        break;
      case 'list':
        this.processList();
        break;
      case 'add':
        this.processAdd(param);
        break;
      case 'task':
        this.processTask(param);
        break;
      case 'delete':
        this.processDelete(param);
        break;
      case 'complete':
        this.processComplete(param);
        break;
      case 'incomplete':
        this.processIncomplete(param);
        break;
      default:
        this.processHelp();
        break;
    } // switch

  } // processor

  processHelp() {
    this.view.showHelp();
  }

  processList() {
    let list = this.model.read()
    // console.log(list)
    this.view.showList(list)
  }

  processAdd(task) {
    this.model.add(task);
  }

  processTask(id) {
    let task = this.model.viewById(id);
    this.view.showTask(task);
  }

  processDelete(id) {
    this.model.deleteTodo(id);
  }

  processComplete(id) {
    this.model.completed(id);
  }

  processIncomplete(id) {
    this.model.incomplete(id);
  }

}  // class TodoController


module.exports = TodoController;
