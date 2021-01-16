const prompt = require('prompt-sync')({sigint: true});
const field = require('./field.js');

const arena = new field.Field(field.Field.generateField(10, 10));

do {
  arena.print();
  const input = prompt('Which way?');
} while (!arena.getResult())
console.log(arena.getResult())
