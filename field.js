const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const hero = '@';

class Field {
  constructor(array) {
    this._tiles = array;
  }

  get tiles() {
    return this._tiles;
  }

  print() {
    this.tiles.forEach(row => {
      let line = '';
      row.forEach(tile => line += tile);
      console.log(line);
    });
  }

  getResult() {
    return 'Not implemented';
  }

  static pickValue(lowerBound, upperBound) {
    return lowerBound + Math.floor(Math.random() * (upperBound - lowerBound));
  }

  static generateField(height, width, holeRatio) {
    const holeCount = Math.floor(height * width * holeRatio);
    const tiles = [];
    let hatPlaced = false;

    for (let rowIndex = 0; rowIndex < height; rowIndex++) {
      const row = [];
      for (let columnIndex = 0; columnIndex < width; columnIndex++) {
        row.push(fieldCharacter);
      }
      tiles.push(row);
    }
    
    for (let i = 0; i < holeCount; i++) {
      tiles[Field.pickValue(1, height)][Field.pickValue(1, width)] = hole;
    }

    while (!hatPlaced) {
      const row = Field.pickValue(1, height);
      const column = Field.pickValue(1, width);

      if (tiles[row][column] === fieldCharacter) {
        tiles[row][column] = hat;
        hatPlaced = true;
      }
    }

    tiles[0][0] = hero;

    return tiles;
  }
}

module.exports = {
  Field,
  hat,
  hole,
  fieldCharacter,
  pathCharacter,
  hero
};
