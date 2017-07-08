"use strict"

const {Controller} = require("./controller.js");

class Main {
  constructor() {

  }

  static viewFactory(task, specific) {
    let ascendOrDescend = specific[0];
    specific = specific.join(' ');
    task = task?task.toLowerCase():task;

    if (task === 'help') {
      return 'This is a helping hand';
    }
    else if (task === 'list') {
      let processShow = new Controller();
      processShow.showData();
    }
    else if (task === 'list:outstanding') {
      let processSortCreate = new Controller();
      processSortCreate.sortTasksByCreationTime(ascendOrDescend);
    }
    else if (task === 'list:completed') {
      let processSortCompleted = new Controller();
      processSortCompleted.sortTasksByCompletedTime(ascendOrDescend);
    }
    else if (task === 'add') {
      let processAdd = new Controller();
      processAdd.insertData(specific);
    }
    else if (task === 'delete' && specific) {
      let hapusKenangan = new Controller();
      hapusKenangan.deleteTask(specific);
    }
    else if (task === 'complete' && specific) {
      let processComplete = new Controller();
      processComplete.completeTask(specific);
    }
    else if (task === 'uncomplete' && specific) {
      let processUncomplete = new Controller();
      processUncomplete.uncompleteTask(specific);
    }
    else if (task === 'tag') {
      let processTag = new Controller();
      processTag.tagTask(specific);
    }
    else if (task.split(':')[0] === 'filter') {
      let processTag = new Controller();
      processTag.filterTask(task.split(':')[1]);
    }
    else if (task === 'burnthemall') {
      let hapusSeluruhKenangan = new Controller();
      hapusSeluruhKenangan.burnThemAll(specific);
    }
    else {
      Controller.falseInput();
    }
  }
}

let args = process.argv.slice(2);
Main.viewFactory(args[0], args.slice(1));
module.exports = { Main };
