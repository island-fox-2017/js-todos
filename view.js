const fs = require('fs')

class View {
  constructor() {
  }
  viewAdd(userInput){
    console.log(`Added '${userInput}' to your TODO list...`);
  }
  viewList(){
    let ambilDataJson = JSON.parse(fs.readFileSync('data.json','utf8').trim())
    var i = 1;
    ambilDataJson.forEach(data => {
        console.log(`${i}. ${data.completed} ${data.task}` );
        i++
    })
  }
  viewDelete(userInput){
    console.log(`Deleted '${userInput}' from your TODO list...`);
  }
}

module.exports = {
  View
}
