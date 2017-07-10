"use strict"

let fs = require('fs');

class Model {
  constructor() {
    this.data = [];
  }

  dataFile() {
    this.data = fs.readFileSync('data.json', 'utf8');
    this.data = JSON.parse(this.data)
    return this.data;
  }

  dataFileDetail(task_id) {
    this.data = fs.readFileSync('data.json', 'utf8');
    this.data = JSON.parse(this.data)
    return this.data[task_id-1];
  }

  detailDataFile(task_id) {
    this.data = fs.readFileSync('data.json', 'utf8');
    this.data = JSON.parse(this.data)
    return this.data[task_id];
  }

  insertData(inputTask) {
    this.data.push(inputTask);
  }

  saveToFile() {
    fs.writeFile('data.json', JSON.stringify(this.data,null,2), (err) => {
      if (err) throw err;
    });
  }

  deleteData(task_id) {
    return this.data.splice(task_id, 1);
  }

  hapusSemuaDataDariFile() {
    this.data = [];
    fs.writeFile('data.json', '[]', (err) => {
      if (err) throw err;
    });
  }

  changeToComplete(task_id) {
    this.data[task_id].complete = true;
    this.data[task_id].time_completed = new Date();
    return true;
  }

  changeToUncomplete(task_id) {
    this.data[task_id].complete = false;
    this.data[task_id].time_completed = false;
    return true;
  }

  sortDataByCompletedTime(ascAtauDes) {
    if (ascAtauDes === 'desc')
      this.data.sort((a,b) => new Date(b.time_completed) > new Date(a.time_completed));
    else
      this.data.sort((a,b) => new Date(b.time_completed) < new Date(a.time_completed));
  }

  sortDataByCreationTime(ascAtauDes) {
    if (ascAtauDes === 'desc')
      this.data.sort((a,b) => new Date(b.time_created) > new Date(a.time_created));
    else
      this.data.sort((a,b) => new Date(b.time_created) < new Date(a.time_created));
  }

  tagData(taskId, tags) {
    for (let k = 0; k < tags.length; k++) {
      this.data[taskId].tag.push(tags[k]);
    }
  }
}

module.exports = {
  Model
};
