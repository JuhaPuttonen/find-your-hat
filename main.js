const prompt = require('prompt-sync')({sigint: true});
const field = require('./field.js');

const up = 'u';
const down = 'd';
const left = 'l';
const right = 'r';

const arena = new field.Field(field.Field.generateField(10, 10, 0.2));
let result;

do {
  console.clear();
  arena.print();
  const input = prompt('Which way? ').toLowerCase();

  switch (input) {
    case up:
      arena.moveHero(0, -1);
      break;
    case down:
      arena.moveHero(0, 1);
      break;
    case left:
      arena.moveHero(-1, 0);
      break;
    case right:
      arena.moveHero(1, 0);
      break;
    default:
      prompt(`Incorrect input: '${input}'!`);
      continue;
  }
  arena.evolve();
} while (!(result = arena.result));

console.log(result)
