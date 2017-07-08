var fs = require('fs');

class Mode {
  constructor() {
    this.data = []
  }



  write(data) {
    console.log(`Added "${data.join(' ')}" to your ToDo List`);
    var tmp = fs.readFileSync('data.json', 'utf8')
    var temp = JSON.parse(tmp);
    var date = new Date()
    temp.push({
      "task": data.join(' '),
      "status": false,
      "createdAt": date.toUTCString(),
      "completedAt": false,
      "tag": []
    });
    this.data = temp
    fs.writeFileSync('data.json', JSON.stringify(this.data, null, 2));
  }

  read() {
    var reed = JSON.parse(fs.readFileSync('data.json', 'utf8'))
    for (var i = 0; i < reed.length; i++) {
      if (reed[i].status == true) {
        console.log(`${i+1}. [X] ${reed[i].task}`)
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
    var date = new Date()
    reed[param - 1].status = true
    reed[param - 1].completedAt = date.toUTCString()
    fs.writeFileSync('data.json', JSON.stringify(reed, null, 2))
  }

  uncomp(param) {
    var reed = JSON.parse(fs.readFileSync('data.json', 'utf8'))
    // console.log(reed[param - 1]);
    reed[param - 1].status = false
    fs.writeFileSync('data.json', JSON.stringify(reed, null, 2))
  }

  sortCreate(param) {
    var reed = JSON.parse(fs.readFileSync('data.json', 'utf8'))
    if (param == 'asc') {
      let asc = reed.sort((a, b) => new Date(b.createdAt) < new Date(a.createdAt))
      fs.writeFileSync('data.json', JSON.stringify(asc, null, 2))
    }
    else if (param == 'desc') {
      let desc = reed.sort((a, b) => new Date(b.createdAt) > new Date(a.createdAt))
      fs.writeFileSync('data.json', JSON.stringify(desc, null, 2))
    }
    for (var i = 0; i < reed.length; i++) {
      if (reed[i].status == true) {
        console.log(`${i+1}. [X] ${reed[i].task}`);
      }
      else {
        console.log(`${i+1}. [ ] ${reed[i].task}`);
      }
    }
  }

  sortComplete(param) {
    var reed = JSON.parse(fs.readFileSync('data.json', 'utf8'))
    if (param == 'asc') {
      let ascc = reed.sort((a, b) => new Date(b.completedAt) < new Date(a.completedAt))
      fs.writeFileSync('data.json', JSON.stringify(ascc, null, 2))
    }
    else if (param == 'desc') {
      let descc = reed.sort((a, b) => new Date(b.completedAt) > new Date(a.completedAt))
      fs.writeFileSync('data.json', JSON.stringify(descc, null, 2))
    }
    for (var i = 0; i < reed.length; i++) {
      if (reed[i].status == true) {
        console.log(`${i+1}. [X] ${reed[i].task}`);
      }
      else {
        console.log(`${i+1}. [ ] ${reed[i].task}`);
      }
    }
  }

  setTag(data) {
    var reed = JSON.parse(fs.readFileSync('data.json', 'utf8'))
    var num = parseInt(data[0])
    var tag = data.splice(1)
    for (var i = 0; i < tag.length; i++) {
      reed[num - 1].tag.push(tag[i])
    }
    fs.writeFileSync('data.json', JSON.stringify(reed, null, 2))
  }

  filter(data) {
    var reed = JSON.parse(fs.readFileSync('data.json', 'utf8'))
    for (var i = 0; i < reed.length; i++) {
      if (reed[i].tag.includes(data.join())) {
        if (reed[i].status == true) {
          console.log(`${i+1}. [X] ${reed[i].task} [${reed[i].tag}]`)
        }
        else {
          console.log(`${i+1}. [ ] ${reed[i].task} [${reed[i].tag}]`)
        }
      }
    }
    // reed.forEach(tags => {
    // if (tags.tag.includes(data) == true) {
    //   console.log('test');
    // }
    // })
  }
}


module.exports = {
  Mode
}
