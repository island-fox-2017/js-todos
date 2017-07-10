'use strict'

class TodoView {
  constructor() {}

  showHelp() {
    console.log(`
    Use one of the following commands:
    - help
    - list
    - add <task_content>
    - task <task_id>
    - delete <task_id>
    - complete <task_id>
    - incomplete <task_id>
      `);
  } // static help

  showTask(task) {
    console.log(`
  Id          : ${task.id}
  Task        : ${task.task}
  Completed   : ${task._status ? 'True' : 'False'}
  Created At  : ${task._createdAt}
  Completed At: ${task._completedAt}
      `);
    // console.log(task);
  }

  showList(list) {
    for (var i = 0; i<= list.length - 1; i++) {
      let task = list[i];
      let completed = task._status ? '✔' : '✘';
      console.log(`${i + 1} : ${completed} : ${task.task}`);
    }
  } // static showList

} // class TodoView



module.exports = TodoView;
