'use strict'

const TodoController = require('./controller');
const input = process.argv.slice(2);

// const file = 'data0.json';

const todo = new TodoController('data.json');
todo.processor(input)
