"use strict"


class View {
  constructor() {

  }
  help() {
    let displayMenu = [
      "$ node main.js # will call help",
      "$ node main.js help",
      "$ node main.js list", "$ node main.js add <task_content>",
      "$ node main.js task <task_id>", "$ node main.js delete <task_id>",
      "$ node main.js complete <task_id>", "$ node main.js uncomplete <task_id>",
      "$ node main.js list:outstanding asc || list:outstanding desc", "$ node main.js list:completed asc || list:completed desc",
      "$ node main.js tag <task_id> <tag_name_1> <tag_name_2> ... <tag_name_N>",
      "$ node main.js filter: <tag_name>"
    ];
    console.log(displayMenu.join("\n"));
  }

  
}

module.exports = View
