"use strict"

class View {
  constructor() {

  }
  help() {
    let displayMenu = [
      '$ node todo.js # will call help',
      '$ node todo.js help',
      '$ node todo.js list',
      '$ node todo.js add <task_content>',
      '$ node todo.js task <task_id>',
      '$ node todo.js delete <task_id>',
      '$ node todo.js complete <task_id>',
      '$ node todo.js decomplete <task_id>',
      '$ node todo.js list:outstanding',
      '$ node todo.js list:completed',
      '$ node todo.js tag <id> <name_1> <name_2>',
      '$ node todo.js filter:<tagname>'
    ];
    console.log(displayMenu.join('\n'));
  }
};

// //class function test
// let view = new View();
// view.help();

module.exports = View;
