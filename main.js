const prompt = require('prompt-sync')({sigint: true});
const field = require('./field.js');

const up = 'u';
const down = 'd';
const left = 'l';
const right = 'r';

// Check if the user has activated hard mode
const hardMode = '--hard' === process.argv[2];
let arena;

// Generate a new, initially solvable level
do {
  arena = new field.Field(field.Field.generateField(10, 20, 0.2));
} while (!arena.validate());

arena.hardMode = hardMode;

let result;

while (!arena.result) {
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
  
  // Check if the level can still be completed
  if (!arena.validate()) {
    arena.result = 'All paths to the hat have become blocked!';
    console.clear();
    arena.print();
  }
}

console.log(arena.result);
