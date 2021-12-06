function Setup(data) {
  let [ draw, ...boards ] = data.trim().split("\n\n");
  draw = draw.split(",").map(n => parseInt(n, 10));
  boards = boards.map(board => {
    board = board.split("\n");
    for (let r = 0; r < board.length; r++) {
      let row = board[r].replace(/\s{2,}/g, " ").trim().split(" ");
      board[r] = row.map(c => parseInt(c, 10));
    }
    return board;
  });
  return ({ draw, boards });
}

class Board {
  constructor(data) {
    this.called = Array(5).fill().map(r => Array(5).fill(false));
    this.numbers = new Map();
    this.score = 0;

    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        const num = data[r][c];

        this.score += num;
        this.numbers.set(num, { r, c });
      }
    }
  }

  call(n) {
    const pt = this.numbers.get(n);
    if (!pt) return this;
    this.called[pt.r][pt.c] = true;
    this.score -= n;
    return this;
  }

  get complete() {
    row:
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        if (!this.called[r][c]) continue row;
      }
      return true;
    }

    column:
    for (let c = 0; c < 5; c++) {
      for (let r = 0; r < 5; r++) {
        if (!this.called[r][c]) continue column;
      }
      return true;
    }

    return false;
  }
}

function Part1(data) {
  let { draw, boards } = data;
  boards = boards.map(b => new Board(b));

  for (const call of draw) {
    for (const board of boards) {
      board.call(call);
      if (board.complete) return board.score * call;
    }
  }
}

function Part2(data) {
  let { draw, boards } = data;
  boards = new Set(boards.map(b => new Board(b)));

  for (const call of draw) {
    for (const board of boards) {
      board.call(call);
      if (board.complete) boards.delete(board);
      if (boards.size === 0) return board.score * call;
    }
  }
}

module.exports = { Part1, Part2, Setup };
