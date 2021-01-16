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
    let presentation = '';
    this.tiles.forEach(row => {
      row.forEach(tile => presentation += tile);
      row += '\n';
    });
    console.log(presentation);
  }

  getResult() {
    return 'Not implemented';
  }

  static pickValue(lowerBound, upperBound) {
    return lowerBound + Math.floor(Math.random() * (upperBound - lowerBound));
  }

  static generateField(height, width, holePercentage) {
    const holeCount = Math.floor(height * width * holePercentage / 100);
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
      tiles[pickValue(1, height)][this.pickValue(1, width)] = hole;
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
