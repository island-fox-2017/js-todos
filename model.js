'use strict'

const fs = require('fs')

class Model {
  constructor() {
    this._filename = './data.json';
  }
  
  readData() {
    let data = fs.readFileSync(this._filename, 'utf8');
    let listData = JSON.parse(data);
    return listData;
  }
  
  addData(data, taskContent, status, createDate) {
    data.push({"task": taskContent, "completed": status, "created_date": createDate});
    let json = JSON.stringify(data);
    fs.writeFileSync('data.json', json, 'utf8');
  }
  
  deleteData(data, taskID) {
    let index = Number(taskID - 1);
    data.splice(index, 1);
    let json = JSON.stringify(data);
    fs.writeFileSync('data.json', json, 'utf8');
  }
  
  addTag(data, taskID, tag1) {
    let id = Number(taskID - 1);
    data[id]['tag'] = [tag1];
    let json = JSON.stringify(data);
    fs.writeFileSync('data.json', json, 'utf8');
  }
  
  addTag2(data, taskID, tag1, tag2) {
    let id = Number(taskID - 1);
    data[id]['tag'] = [tag1];
    data[id]['tag'].push(tag2);
    let json = JSON.stringify(data);
    fs.writeFileSync('data.json', json, 'utf8');
  }
  
  markCompleted(data, taskID, status, completedDate) {
    let id = Number(taskID - 1);
    data[id]['completed'] = status;
    data[id]['completed_date'] = completedDate;
    let json = JSON.stringify(data);
    fs.writeFileSync('data.json', json, 'utf8');
  }
  
  markUncomplete(data, taskID, status, uncompletedDate) {
    let id = Number(taskID - 1);
    data[id]['completed'] = status;
    data[id]['uncompleted_date'] = uncompletedDate;
    let json = JSON.stringify(data);
    fs.writeFileSync('data.json', json, 'utf8');
  }
}
  
module.exports = Model