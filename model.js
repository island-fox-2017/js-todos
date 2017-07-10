'use strict'

const fs = require('fs');

class Task {
  constructor(id, task, status = 0) {
    this.id = id;
    this.task = task;
    this._status = status;
    this._createdAt = new Date();
    this._completedAt = null;
  }
}  // class Task


class TodoModel {
  constructor(file) {
    this.file = file;
  }

  read() {
    return JSON.parse(fs.readFileSync(this.file, 'utf8'))
  }

  save(todo) {
    let newTodo = this.rearrangeId(todo)
    fs.writeFileSync(this.file, JSON.stringify(newTodo));
  }

  rearrangeId(todo) {
    for (var i = 0; i <= todo.length - 1; i++) todo[i].id = i + 1;
    return todo;
  }

  add(task) {
    let todo = this.read();
    let id = todo.length + 1;
    let newTask = new Task(id, task);
    console.log(newTask);
    todo.push(newTask);
    this.save(todo);
  }

  completed(id) {
    return this.setComplete(id, true);
  }

  incomplete(id) {
    return this.setComplete(id, false);
  }

  setComplete(id, status) {
    let todo = this.read();
    for (var i = 0; i <= todo.length - 1; i++) {
      if (todo[i].id == id) {
        if (status) {
          todo[i]._status = 1;
          todo[i]._completedAt = new Date()
        }
        else {
          todo[i]._status = 0;
          todo[i]._completedAt = null;
        }
      }
    }
    this.save(todo)
    // return console.log(`Todo with id: ${id} not found!.`);
    // throw new Error(`Todo with id: ${id} not found!.`)
  }

  deleteToDo(id) {
    let todo = this.read();
    for (var i = 0; i <= todo.length - 1; i++) {
      if (todo[i].id == id) {
        todo.splice(i, 1);
        this.save(todo);
        return console.log(`Task with Id ${id} is deleted`);
      }
    }
    return console.log(`Task with Id ${id} successfully deleted.`);
  }

  viewAll() {
    return this.read()
  }

  viewById(id) {
    let todo = this.read();
    for (var i = 0; i <= todo.length - 1; i++) {
      if (todo[i].id == id) return todo[i];
    }
  }

}  // class TodoModel

// let tes = new TodoModel('data0.json');
// tes.completed(7);
// tes.add('percobaan')
// tes.deleteToDo(2);
// console.log(tes.viewById(5));

module.exports = {
  Task,
  TodoModel
};
