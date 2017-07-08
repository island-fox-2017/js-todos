'use strict'

let Model = require('./model')
let View = require('./view')
let Controller = require('./controller')

let argv = process.argv;
let option = argv[2];
let contentOrID = argv[3];
let tag1 = argv[4];
let tag2 = argv[5];
let start = new Controller();

start.executeMenu(option, contentOrID, tag1, tag2);