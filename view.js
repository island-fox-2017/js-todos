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
    console.log('node todo.js list:outstanding <asc/desc>');
    console.log('node todo.js list:completed <asc/desc>');
    console.log('node todo.js tag <data_number> <tag_name1> <tag_name2> ...');
    console.log('node todo.js filter: <tag_name>');
  }
}

module.exports = {
  View
}
