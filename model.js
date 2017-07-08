"use strict"

let fs = require('fs');

class Model {
  constructor() {
    this.data = [];
  }

  theData() {
    this.data = fs.readFileSync('data.json', 'utf8');
    this.data = JSON.parse(this.data)
    return this.data;
  }

  insertData(specific) {
    this.data.push(specific);
  }

  deleteData(specific) {
    return this.data.splice(specific, 1);
  }

  burnThemAll() {
    this.data = [];
    fs.writeFile('data.json', '[]', (err) => {
      if (err) throw err;
    });
  }

  saveToData() {
    fs.writeFile('data.json', JSON.stringify(this.data,null,2), (err) => {
      if (err) throw err;
    });
  }

  completeData(specific) {
    this.data[specific].complete = true;
    this.data[specific].time_completed = new Date();
    return true;
  }

  uncompleteData(specific) {
    /*
    let specificIndex = this.data.findIndex(i => i.task === specific);
    if (specificIndex !== -1) {
      if (this.data[specificIndex].complete === true) {
        this.data[specificIndex].complete = false;
        this.data[specificIndex].time_completed = false;
        return true;
      }
      else { return false; }
    }
    */
    this.data[specific].complete = false;
    this.data[specific].time_completed = false;
    return true;
  }

  sortDataByCreationTime(ascendOrDescend) {
    if (ascendOrDescend === 'desc')
      this.data.sort((a,b) => new Date(b.time_created) > new Date(a.time_created));
    else
      this.data.sort((a,b) => new Date(b.time_created) < new Date(a.time_created));
  }

  sortDataByCompletedTime(ascendOrDescend) {
    if (ascendOrDescend === 'desc')
      this.data.sort((a,b) => new Date(b.time_completed) > new Date(a.time_completed));
    else
      this.data.sort((a,b) => new Date(b.time_completed) < new Date(a.time_completed));
  }

  tagData(taskId, tags) {
    for (let k = 0; k < tags.length; k++) {
      this.data[taskId].tag.push(tags[k]);
    }
  }
}

module.exports = { Model };
