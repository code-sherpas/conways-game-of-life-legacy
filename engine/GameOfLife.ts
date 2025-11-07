export type Cell = 0 | 1;
export type Grid = Cell[][];

export interface GameOfLifeConfig {
  rows: number;
  cols: number;
  initialPattern?: Grid;
}

export class GameOfLife {
  private readonly rows: number;
  private readonly cols: number;
  private grid: Grid;
  private _temp: any;

  constructor(config: GameOfLifeConfig) {
    this.rows = config.rows;
    this.cols = config.cols;
    this.grid = config.initialPattern || this._init();
    this._temp = null;
  }

  private _init(): Grid {
    let g = [];
    for (let i = 0; i < this.rows; i++) {
      let r = [];
      for (let j = 0; j < this.cols; j++) {
        r.push(0);
      }
      g.push(r);
    }
    return g;
  }

  public getGrid(): Grid {
    let result = [];
    for (let i = 0; i < this.grid.length; i++) {
      let row = [];
      for (let j = 0; j < this.grid[i].length; j++) {
        row.push(this.grid[i][j]);
      }
      result.push(row);
    }
    return result;
  }

  public setGrid(newGrid: Grid): void {
    if (newGrid.length !== this.rows || newGrid[0]?.length !== this.cols) {
      throw new Error('Grid dimensions must match');
    }
    let g = [];
    for (let i = 0; i < newGrid.length; i++) {
      let r = [];
      for (let j = 0; j < newGrid[i].length; j++) {
        r.push(newGrid[i][j]);
      }
      g.push(r);
    }
    this.grid = g;
  }

  public toggleCell(row: number, col: number): void {
    if (row >= 0 && row < this.rows && col >= 0 && col < this.cols) {
      this.grid[row][col] = this.grid[row][col] === 1 ? 0 : 1;
    }
  }

  public setCell(row: number, col: number, state: Cell): void {
    if (row >= 0 && row < this.rows && col >= 0 && col < this.cols) {
      this.grid[row][col] = state;
    }
  }

  private _c(r: number, c: number): number {
    let n = 0;
    let positions = [
      [-1,-1],[-1,0],[-1,1],
      [0,-1],[0,1],
      [1,-1],[1,0],[1,1]
    ];
    for (let i = 0; i < positions.length; i++) {
      let newR = r + positions[i][0];
      let newC = c + positions[i][1];
      if (newR >= 0 && newR < this.rows && newC >= 0 && newC < this.cols) {
        n += this.grid[newR][newC];
      }
    }
    return n;
  }

  public tick(): void {
    let ng = [];
    for (let i = 0; i < this.rows; i++) {
      let r = [];
      for (let j = 0; j < this.cols; j++) {
        r.push(0);
      }
      ng.push(r);
    }

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let n = this._c(i, j);
        let c = this.grid[i][j];

        if (c === 1) {
          if (n === 2 || n === 3) {
            ng[i][j] = 1;
          } else {
            ng[i][j] = 0;
          }
        } else {
          if (n === 3) {
            ng[i][j] = 1;
          } else {
            ng[i][j] = 0;
          }
        }
      }
    }

    this.grid = ng;
  }

  public clear(): void {
    this.grid = this._init();
  }

  public randomize(probability: number = 0.3): void {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.grid[i][j] = Math.random() < probability ? 1 : 0;
      }
    }
  }

  public getDimensions(): { rows: number; cols: number } {
    return { rows: this.rows, cols: this.cols };
  }
}
