'use strict'
const fs = require('fs');

class Model{
  constructor(file){
    this.file = file;
    this.data = this.parseFile();
  }

  parseFile(){
    const data = JSON.parse(fs.readFileSync(this.file, 'utf8'));
    return data;
  }

  GetData(){
    return this.data;
  }

  addData(value){
    let obj = {};
    obj['task'] = value;
    obj['status'] = false;
    obj['createAt'] = new Date();
    obj['tag'] = [];
    obj['completeAt'] = false;

    this.data.push(obj);
  }

  deleteData(id){
    console.log(`Deleted ${this.data[id].task} from your TODO list...`);
    this.data.splice(id, 1);
  }

  toggleTask(id){
    if(this.data[id].status == true)
    {
      this.data[id].status = false;
    }
    else
    {
      this.data[id].status = true;
    }
  }

  completeTask(id){
    this.data[id].status = true;
    this.data[id].completeAt = new Date();
  }

  uncompleteTask(id){
    this.data[id].status = false;
    this.data[id].completeAt = false;
  }

  inputTag(id,tags){
    for(let i = 0; i < tags.length; i++)
    {
      this.data[id-1].tag.push(tags[i]);
    }
  }

  writeData(){
    let newData = JSON.stringify(this.data, null, 2)
    fs.writeFile('data.json', newData, (err) => {
      if (err) throw err;
    });
  }

}

module.exports = {
  Model
}
