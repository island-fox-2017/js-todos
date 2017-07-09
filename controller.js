"use strict"
const Model = require('./model');
const View = require('./view');

class Controller {
  //INSTANTIATE MODEL AND VIEW CLASS IN CONTROLLER CLASS CONSTRUCTOR
  constructor() {
    this.model = new Model();
    this.view = new View();
  };
  //RUN THE COMMAND BY GIVING PARAMETER(S) FROM ARGV ARRAY INDEX[2] OR SO ON
  run(input, filter) {
    if (input[0] === 'list') {
      this.list(this.model.readFile());
      console.log('▶︎ Successfully run list');
      console.log('▶︎ Type help for assistance');
    } else if (input[0] === 'add') {
      let command = [];
      for (let i = 1; i < input.length; i++) {
        command.push(input[i]);
      }
      this.add(command.join(' '));
      console.log('▶︎ Successfully run add');
      console.log('▶︎ Type help for assistance');
    } else if (input[0] === 'delete') {
      this.removeTask(input[1]);
      console.log('▶︎ Successfully run delete');
      console.log('▶︎ Type help for assistance');
    } else if (input[0] === 'complete') {
      this.completed(input[1]);
      console.log('▶︎ Successfully run completed');
      console.log('▶︎ Type help for assistance');
    } else if (input[0] === 'decomplete') {
      this.decompleted(input[1]);
      console.log('▶︎ Successfully run decompleted');
      console.log('▶︎ Type help for assistance');
    } else if (input[0] === 'task') {
      this.showTask(input[1]);
      console.log('▶︎ Successfully run task');
      console.log('▶︎ Type help for assistance');
    } else if (input[0] === 'help') {
      this.callHelp();
    } else if (input[0] === 'list:outstanding') {
      this.sortByCreated(input[1]);
      console.log('▶︎ Successfully run list:outstanding');
      console.log('▶︎ Type help for assistance');
    } else if (input[0] === 'list:completed') {
      this.sortByCompleted(input[1]);
      console.log('▶︎ Successfully run list:completed');
      console.log('▶︎ Type help for assistance');
    } else if (input[0] === 'tag') {
      let task_id = input[1];
      let tags = [];
      for (let i = 2; i < input.length; i++) {
        tags.push(input[i]);
      }
      // console.log(tags);
      this.tagTask(task_id, tags);
      console.log('▶︎ Successfully run tag');
      console.log('▶︎ Type help for assistance');
    } else if (filter[0] === 'filter') {
      this.filter(filter[1]);
      console.log('▶︎ Successfully run filter');
      console.log('▶︎ Type help for assistance');
    } else if (input[0] === null) {
      this.callHelp();
    }
  };

  //SHOW THE LIST OF TASK(S)
  list(data) {
    if (data.length > 0) {
      data.forEach(d => {
        console.log(`${d.id}. ${d.completed ? '◉' : '◎'} ${d.task} [${d.tags}]`);
      })
    } else {
      console.log('You have no task for today. Yeay!');
    }
  };

  //ADD TASK
  add(task) {
    let data = this.model.readFile();
    let json = {
      "id": 0,
      "task": task,
      "completed": false,
      "created_at": new Date(),
      "tags": []
    };
    data.push(json);
    // console.log(data);
    data = this.autoId(data);
    this.model.writeData(data);
    console.log(`▶︎ Added ✚ ${json.task} ✚ to your TODO list... ◀︎`);
  };

  //AUTO INCREMENT ID FUNCTION
  autoId(data) {
    for (let i = 0; i < data.length; i++) {
      data[i].id = i + 1;
    }
    return data;
  };

  //DELETE TASK
  removeTask(id) {
    let data = this.model.readFile();
    for (let i = 0; i < data.length; i++) {
      if (data[i].id == id) {
        data.splice(i, 1);
        var dataSpliced = data;
        console.log(`Task successfully deleted`);
      }
      // if (data[i].id == id) {
      //   data.splice(i, 1);
      //   console.log(`Task successfully deleted`);
      // } else {
      //   console.log(`Please choose by task id`);
      //   break;
      // }
    } //for
    data = this.autoId(dataSpliced);
    this.model.writeData(data);
  };

  //MARK TASK AS COMPLETED
  completed(id) {
    let data = this.model.readFile();
    for (let i = 0; i < data.length; i++) {
      if (data[i].id == id) {
        data[i].completed = true;
        data[i].completed_at = new Date();
        break;
      }
    }
    //AFTER OBJECT IN DATA MANIPULATED
    //DON'T FORGET TO CALL WRITEDATA() AGAIN TO WRITE THE NEW ARRAY OF OBJECT TO JSON
    this.model.writeData(data);
  };

  decompleted(id) {
    let data = this.model.readFile();
    for (let i = 0; i < data.length; i++) {
      if (data[i].id == id) {
        data[i].completed = false;
        break;
      }
    }
    this.model.writeData(data);
  };

  showTask(id) {
    let data = this.model.readFile();
    for (let i = 0; i < data.length; i++) {
      if (data[i].id == id) {
        console.log(`${data[i].id}. ${data[i].completed ? '◉' : '◎'} ${data[i].task}, date created: ${data[i].created_at}, tags: ${data[i].tags}`);
        break;
      }
    }
  };

  callHelp() {
    this.view.help();
  };

  sortByCreated(command) {
    let data = this.model.readFile();
    if (command === 'asc') {
      data.sort((a, b) => new Date(b.created_at) < new Date(a.created_at));
    } else if (command === 'desc') {
      data.sort((a, b) => new Date(b.created_at) > new Date(a.created_at));
    } else {
      data.sort((a, b) => new Date(b.created_at) > new Date(a.created_at));
    }
    data.forEach(d => {
      console.log(`${d.id}. ${d.completed ? '◉' : '◎'} ${d.task}`);
    });
  };

  sortByCompleted(command) {
    let data = this.model.readFile();
    if (command === 'asc') {
      data.sort((a, b) => new Date(b.created_at) < new Date(a.created_at));
    } else if (command === 'desc') {
      data.sort((a, b) => new Date(b.created_at) > new Date(a.created_at));
    } else {
      data.sort((a, b) => new Date(b.created_at) > new Date(a.created_at));
    }
    for (let i = 0; i < data.length; i++) {
      if (data[i].completed === true) {
        console.log(`${data[i].id}. ${data[i].completed ? '◉' : '◎'} ${data[i].task}`);
      }
    };
  };

  tagTask(task_id, tags) {
    let data = this.model.readFile();
    for (let i = 0; i < data.length; i++) {
      for (var j = 0; j < tags.length; j++) {
        if (data[i].id == task_id) {
          data[i].tags.push(tags[j]);
        }
      }
    }
    console.log(`Data currently`);
//    console.log(data);
    this.model.writeData(data);
  };

  filter(tag) {
    let data = this.model.readFile();
    for (let i = 0; i < data.length; i++) {
      if (data[i].tags.includes(tag)) {
        console.log(`${data[i].id}. ${data[i].completed ? '◉' : '◎'} ${data[i].task} [${data[i].tags}]`);
      }
    }
  };

}; //class

// let input = process.argv.slice(2, process.argv.length);
// let filter = input[0].split(":");
// // console.log(input);
// console.log(filter);
// console.log(`▶︎ You are successfully running ✚ ${input[0]} ✚ command ◀︎`);
// console.log(`▶︎ Output ↴`);
// let controller = new Controller();
// controller.run(input, filter);



module.exports = Controller;
