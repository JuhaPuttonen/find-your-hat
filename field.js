const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const hero = '@';

class Field {
  constructor(array) {
    this._tiles = array;
    this._result = null;
    this._hardMode = false;
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

  get hardMode() {
    return this._hardMode;
  }

  set hardMode(hardMode) {
    this._hardMode = hardMode;
  }

  findHero() {
    for (let i = 0; i < this.tiles.length; i++) {
      for (let j = 0; j < this.tiles[i].length; j++) {
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
    // The game field evolves only in hard mode
    if (!this.hardMode) {
      return;
    }

    // Pick a spot a new hole
    const emptySpots = [];

    this.tiles.forEach((row, rowIndex) => {
      row.forEach((tile, columnIndex) => {
        if (tile === fieldCharacter || tile === pathCharacter) {
          emptySpots.push([rowIndex, columnIndex]);
        }
      })
    });

    const spot = emptySpots[Math.floor(Math.random() * emptySpots.length)];
    this.tiles[spot[0]][spot[1]] = hole;
  }

  print() {
    this.tiles.forEach(row => {
      let line = '';
      row.forEach(tile => line += tile);
      console.log(line);
    });
  }

  static generateField(height, width, holeRatio) {
    const holeCount = Math.floor(height * width * holeRatio);
    const tiles = [];
    let hatPlaced = false;
    let heroPlaced = false;

    // Create empty tiles
    for (let rowIndex = 0; rowIndex < height; rowIndex++) {
      const row = [];
      for (let columnIndex = 0; columnIndex < width; columnIndex++) {
        row.push(fieldCharacter);
      }
      tiles.push(row);
    }
    
    // Place the initial holes onto the field
    for (let i = 0; i < holeCount; i++) {
      tiles[pickValue(0, height)][pickValue(0, width)] = hole;
    }

    // Place the hat onto the field
    while (!hatPlaced) {
      const row = pickValue(0, height);
      const column = pickValue(0, width);

      if (tiles[row][column] === fieldCharacter) {
        tiles[row][column] = hat;
        hatPlaced = true;
      }
    }

    // Place the hero onto the field
    while (!heroPlaced) {
      const row = pickValue(0, height);
      const column = pickValue(0, width);

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
    const nextTiles = [ start ];
    let hatReached = false;

    while (nextTiles.length > 0) {
      const tile = nextTiles.pop();

      if (this.tiles[tile[0]][tile[1]] === hat) {
        hatReached = true;
        break;
      }

      const left = [tile[0], tile[1] - 1];
      const up = [tile[0] - 1, tile[1]];
      const right = [tile[0], tile[1] + 1];
      const down = [tile[0] + 1, tile[1]];
      const possibleSteps = [left, up, right, down];

      possibleSteps.forEach(step => {
        if (this.canGoTo(step) && !explored[step[0]][step[1]]) {
          nextTiles.push(step);
        }
      });

      explored[tile[0]][tile[1]] = true;
    }
    
    return hatReached;
  }

  canGoTo(tile) {
    return (tile[0] >= 0 && tile[0] < this.height)
    && (tile[1] >= 0 && tile[1] < this.width)
    && (this.tiles[tile[0]][tile[1]] !== hole);
  }
}

function pickValue(lowerBound, upperBound) {
  return lowerBound + Math.floor(Math.random() * (upperBound - lowerBound));
}

module.exports = {
  Field
};
