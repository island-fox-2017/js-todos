class View {
  constructor() {

  }
  help() {
    console.log('node todo.js help');
    console.log('node todo.js add <data>');
    console.log('node todo.js list');
    console.log('node todo.js delete <data_number>');
    console.log('node todo.js completed <data_number>');
    console.log('node todo.js uncompleted <data_number>');
    console.log('node todo.js mayday');
  }
}

module.exports = {
  View
}
