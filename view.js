"use strict"

class View {
  constructor(){
    
  }
  
  menu(){
    let displayMenu = [
      "$ node main.js # will call help",
      "$ node main.js help",
      "$ node main.js list",
      "$ node main.js add <task_content>",
      "$ node main.js task <task_id>",
      "$ node main.js delete <task_id>",
      "$ node main.js complete <task_id>",
      "$ node main.js uncomplete <task_id>"
    ];
  // return displayMenu.join('\n')
  console.log(displayMenu.join('\n'));
  }
}

// let view = new View()
// return console.log(view.menu())

module.exports = View
