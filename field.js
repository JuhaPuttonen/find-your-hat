const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const hero = '@';

class Field {
  constructor(array) {
    this._tiles = array;
    this._result = null;
  }

  get tiles() {
    return this._tiles;
  }

  get result() {
    return this._result;
  }

  set result(result) {
    this._result = result;
  }

  get width() {
    return this._tiles[0].length;
  }

  get height() {
    return this._tiles.length;
  }

  findHero() {
    for (let i = 0; i < this.tiles.length; i++) {
      for (let j = 0; j < this.tiles.length; j++) {
        if (hero === this.tiles[i][j]) {
          return [i, j];
        }
      }
    }
  }

  moveHero(horizontalDelta, verticalDelta) {
    const oldCoordinates = this.findHero();
    const newCoordinates = [oldCoordinates[0] + verticalDelta, oldCoordinates[1] + horizontalDelta];

    if (newCoordinates[0] < 0 || newCoordinates[0] >= this.tiles.length
        || newCoordinates[1] < 0 || newCoordinates[1] >= this.tiles[0].length) {
      this.result = 'Out of bounds instruction!';
    } else if (hole === this.tiles[newCoordinates[0]][newCoordinates[1]]) {
      this.result = 'You fell down a hole!';
    } else if (hat === this.tiles[newCoordinates[0]][newCoordinates[1]]) {
      this.result = 'Congratulations, you found your hat!';
    } else {
      this.tiles[oldCoordinates[0]][oldCoordinates[1]] = pathCharacter;
      this.tiles[newCoordinates[0]][newCoordinates[1]] = hero;
    }
  }

  evolve() {

  }

  print() {
    this.tiles.forEach(row => {
      let line = '';
      row.forEach(tile => line += tile);
      console.log(line);
    });
  }

  static pickValue(lowerBound, upperBound) {
    return lowerBound + Math.floor(Math.random() * (upperBound - lowerBound));
  }

  static generateField(height, width, holeRatio) {
    const holeCount = Math.floor(height * width * holeRatio);
    const tiles = [];
    let hatPlaced = false;
    let heroPlaced = false;

    for (let rowIndex = 0; rowIndex < height; rowIndex++) {
      const row = [];
      for (let columnIndex = 0; columnIndex < width; columnIndex++) {
        row.push(fieldCharacter);
      }
      tiles.push(row);
    }
    
    for (let i = 0; i < holeCount; i++) {
      tiles[Field.pickValue(0, height)][Field.pickValue(0, width)] = hole;
    }

    while (!hatPlaced) {
      const row = Field.pickValue(0, height);
      const column = Field.pickValue(0, width);

      if (tiles[row][column] === fieldCharacter) {
        tiles[row][column] = hat;
        hatPlaced = true;
      }
    }

    while (!heroPlaced) {
      const row = Field.pickValue(0, height);
      const column = Field.pickValue(0, width);

      if (tiles[row][column] === fieldCharacter) {
        tiles[row][column] = hero;
        heroPlaced = true;
      }
    }

    return tiles;
  }

  validate() {
    const start = this.findHero();
    const explored = new Array(this.height).fill(false).map(
        () => new Array(this.width).fill(false));
    
    return searchFrom(start, explored, this);
  }
}

function searchFrom(start, explored, field) {
  if (start[0] < 0 || start[0] >= field.height
      || start[1] < 0 || start[1] >= field.width) {
    return false;
  } else if (explored[start[0]][start[1]]) {
    return false;
  } else if (field.tiles[start[0]][start[1]] === hat) {
    explored[start[0]][start[1]] = true;
    return true;
  } else if (field.tiles[start[0]][start[1]] === hole) {
    explored[start[0]][start[1]] = true;
    return false;
  }

  explored[start[0]][start[1]] = true;

  return searchFrom([start[0], start[1] - 1], explored, field)
    || searchFrom([start[0] - 1, start[1]], explored, field)
    || searchFrom([start[0], start[1] + 1], explored, field)
    || searchFrom([start[0] + 1, start[1]], explored, field);
}

module.exports = {
  Field
};
