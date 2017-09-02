const readline = require('readline');

const reader = readline.createInterface({
  // it's okay if this part is magic; it just says that we want to
  // 1. output the prompt to the standard output (console)
  // 2. read input from the standard input (again, console)

  input: process.stdin,
  output: process.stdout
});

class Game {
  constructor() {
    this.stacks = [[3,2,1],[],[]];
  }

  run(completionCallback) {
    if (this.isWon()) {
      completionCallback();
    } else {
      this.promptMove(this.move.bind(this), completionCallback, this.run.bind(this));
    }
  }

  promptMove(moveCallBack, completionCallback, runCallBack) {
    this.display();
    reader.question('where from fam', function(fromTowerStr) {
      reader.question('where to fam', function(toTowerStr) {
        const fromTowerIdx = parseInt(fromTowerStr);
        const toTowerIdx = parseInt(toTowerStr);
        if (moveCallBack(fromTowerIdx, toTowerIdx)) {
          runCallBack(completionCallback);
        }
      });
    });
  }

  move(fromTowerIdx, toTowerIdx) {
    const valid = this.validMove(fromTowerIdx, toTowerIdx);
    if (valid) {
      const fromTower = this.stacks[fromTowerIdx];
      const toTower = this.stacks[toTowerIdx];
      toTower.push(fromTower.pop());
    } else {
      console.log('error error beep boop');
    }
    return valid;
  }

  validMove(fromTowerIdx, toTowerIdx) {
    if (fromTowerIdx < 0 || fromTowerIdx > 2 || toTowerIdx < 0 || toTowerIdx > 2) {
      return false;
    }
    const fromTower = this.stacks[fromTowerIdx];
    const toTower = this.stacks[toTowerIdx];

    if (fromTower.length === 0) return false;
    if (fromTower[fromTower.length-1] > toTower[toTower.length-1]) return false;

    return true;
  }

  isWon() {
    if (this.stacks[0].length === 0 && this.stacks[1].length === 3
      || this.stacks[2].length === 3) {
        return true;
      }
    return false;
  }

  display() {
    for (let i = 0; i < this.stacks.length; i++) {
      console.log(`tower ${i}: ${JSON.stringify(this.stacks[i])}`);
    }
  }
}
const g = new Game();
g.run( () => {
  reader.close();
  console.log('woooo');
});
