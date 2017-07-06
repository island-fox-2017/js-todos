var fs = require('fs');

class Mode {
  constructor() {
    this.data = []
  }

  write(data) {
    console.log(`Added "${data.join(' ')}" to your ToDo List`);
    var tmp = fs.readFileSync('data.json', 'utf8')
    var temp = JSON.parse(tmp);
    // this.data.push(temp);
    temp.push({
      "task": data.join(' '),
      "status": "false"
    });
    this.data = temp
    fs.writeFileSync('data.json', JSON.stringify(this.data, null, 2));
  }

  read() {
    var reed = JSON.parse(fs.readFileSync('data.json', 'utf8'))
    for (var i = 0; i < reed.length; i++) {
      if (reed[i].status == true) {
        console.log(`${i+1}. [x] ${reed[i].task}`)
      }
      else {
        console.log(`${i+1}. [ ] ${reed[i].task}`)
      }
    }
  }

  delete(param) {
    var reed = JSON.parse(fs.readFileSync('data.json', 'utf8'))
    console.log(`you've been deleted ${JSON.stringify(reed[param - 1].task)} from your To Do list`);
    reed.splice(param - 1, 1)
    fs.writeFileSync('data.json', JSON.stringify(reed, null, 2))
  }

  mayday() {
    fs.writeFileSync('data.json', JSON.stringify([], null, 2))
  }

  comp(param) {
    var reed = JSON.parse(fs.readFileSync('data.json', 'utf8'))
    // console.log(reed[param - 1]);
    reed[param - 1].status = true
    fs.writeFileSync('data.json', JSON.stringify(reed, null, 2))
  }

  uncomp(param) {
    var reed = JSON.parse(fs.readFileSync('data.json', 'utf8'))
    // console.log(reed[param - 1]);
    reed[param - 1].status = false
    fs.writeFileSync('data.json', JSON.stringify(reed, null, 2))
  }
}


module.exports = {
  Mode
}
