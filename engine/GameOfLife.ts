/**
 * Conway's Game of Life Engine
 *
 * This module implements the core game logic separated from visualization.
 * The engine manages a 2D grid where each cell can be alive or dead.
 */

export type Cell = 0 | 1; // 0 = dead, 1 = alive
export type Grid = Cell[][];

export interface GameOfLifeConfig {
  rows: number;
  cols: number;
  initialPattern?: Grid;
}

/**
 * Main Game of Life engine class
 */
export class GameOfLife {
  private readonly rows: number;
  private readonly cols: number;
  private grid: Grid;

  constructor(config: GameOfLifeConfig) {
    this.rows = config.rows;
    this.cols = config.cols;
    this.grid = config.initialPattern || this.createEmptyGrid();
  }

  /**
   * Creates an empty grid with all cells dead
   */
  private createEmptyGrid(): Grid {
    return Array.from({ length: this.rows }, () =>
      Array.from({ length: this.cols }, () => 0)
    );
  }

  /**
   * Gets the current state of the grid
   */
  public getGrid(): Grid {
    return this.grid.map(row => [...row]); // Return a copy
  }

  /**
   * Sets the grid to a new state
   */
  public setGrid(newGrid: Grid): void {
    if (newGrid.length !== this.rows || newGrid[0]?.length !== this.cols) {
      throw new Error('Grid dimensions must match');
    }
    this.grid = newGrid.map(row => [...row]);
  }

  /**
   * Toggles a cell's state at the given position
   */
  public toggleCell(row: number, col: number): void {
    if (row >= 0 && row < this.rows && col >= 0 && col < this.cols) {
      this.grid[row][col] = this.grid[row][col] === 1 ? 0 : 1;
    }
  }

  /**
   * Sets a cell to alive or dead
   */
  public setCell(row: number, col: number, state: Cell): void {
    if (row >= 0 && row < this.rows && col >= 0 && col < this.cols) {
      this.grid[row][col] = state;
    }
  }

  /**
   * Counts the number of live neighbors for a given cell
   */
  private countLiveNeighbors(row: number, col: number): number {
    let count = 0;

    // Check all 8 neighbors
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        // Skip the center cell
        if (i === 0 && j === 0) continue;

        const newRow = row + i;
        const newCol = col + j;

        // Check if neighbor is within bounds
        if (
          newRow >= 0 &&
          newRow < this.rows &&
          newCol >= 0 &&
          newCol < this.cols
        ) {
          count += this.grid[newRow][newCol];
        }
      }
    }

    return count;
  }

  /**
   * Advances the game by one generation according to Conway's rules:
   *
   * 1. Any live cell with fewer than two live neighbours dies (underpopulation)
   * 2. Any live cell with two or three live neighbours lives on
   * 3. Any live cell with more than three live neighbours dies (overpopulation)
   * 4. Any dead cell with exactly three live neighbours becomes alive (reproduction)
   */
  public tick(): void {
    const newGrid = this.createEmptyGrid();

    // Apply rules to all cells simultaneously
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const liveNeighbors = this.countLiveNeighbors(row, col);
        const currentCell = this.grid[row][col];

        if (currentCell === 1) {
          // Live cell rules
          if (liveNeighbors === 2 || liveNeighbors === 3) {
            newGrid[row][col] = 1; // Lives on
          } else {
            newGrid[row][col] = 0; // Dies
          }
        } else {
          // Dead cell rules
          if (liveNeighbors === 3) {
            newGrid[row][col] = 1; // Becomes alive
          } else {
            newGrid[row][col] = 0; // Stays dead
          }
        }
      }
    }

    this.grid = newGrid;
  }

  /**
   * Clears the grid (sets all cells to dead)
   */
  public clear(): void {
    this.grid = this.createEmptyGrid();
  }

  /**
   * Randomizes the grid with a given probability of cells being alive
   */
  public randomize(probability: number = 0.3): void {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        this.grid[row][col] = Math.random() < probability ? 1 : 0;
      }
    }
  }

  /**
   * Gets the dimensions of the grid
   */
  public getDimensions(): { rows: number; cols: number } {
    return { rows: this.rows, cols: this.cols };
  }
}
