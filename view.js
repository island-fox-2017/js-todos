"use strict"

class View{
  constructor(){
    
  }
  
  help(){
    console.log(`           HowTo ToDo App
  ===============================
  - node todo.js help
  - node todo.js list
  - node todo.js add <task to add> <== to add task in todo app
  - node todo.js task <id> <== to view task based on id task
  - node todo.js delete <id> <== to delete task in todo app based on id task
  - node todo.js complete <id> <== to mark task from not complete to completed based on id task
  - node todo.js uncomplete <id> <== to unmark task from complete to uncomplete based on id task
  - node todo.js `);
  }
  
}

let view = new View()


console.log(view.help());

module.exports = View;
