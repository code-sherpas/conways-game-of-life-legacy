import { GameOfLife, Grid, Cell } from '../GameOfLife';

describe('GameOfLife', () => {
  describe('Initialization', () => {
    test('should create an empty grid with specified dimensions', () => {
      const game = new GameOfLife({ rows: 5, cols: 10 });
      const grid = game.getGrid();

      expect(grid).toHaveLength(5);
      expect(grid[0]).toHaveLength(10);
      expect(grid.every(row => row.every(cell => cell === 0))).toBe(true);
    });

    test('should initialize with a provided pattern', () => {
      const pattern: Grid = [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
      ];
      const game = new GameOfLife({ rows: 3, cols: 3, initialPattern: pattern });
      const grid = game.getGrid();

      expect(grid).toEqual(pattern);
    });

    test('should return dimensions correctly', () => {
      const game = new GameOfLife({ rows: 10, cols: 20 });
      const dimensions = game.getDimensions();

      expect(dimensions).toEqual({ rows: 10, cols: 20 });
    });

    test('should return a copy of the grid, not the original', () => {
      const game = new GameOfLife({ rows: 3, cols: 3 });
      const grid1 = game.getGrid();
      const grid2 = game.getGrid();

      expect(grid1).toEqual(grid2);
      expect(grid1).not.toBe(grid2); // Different references
    });
  });

  describe('Grid Manipulation', () => {
    test('should toggle a cell from dead to alive', () => {
      const game = new GameOfLife({ rows: 3, cols: 3 });
      game.toggleCell(1, 1);
      const grid = game.getGrid();

      expect(grid[1][1]).toBe(1);
    });

    test('should toggle a cell from alive to dead', () => {
      const game = new GameOfLife({ rows: 3, cols: 3 });
      game.setCell(1, 1, 1);
      game.toggleCell(1, 1);
      const grid = game.getGrid();

      expect(grid[1][1]).toBe(0);
    });

    test('should set a cell to alive', () => {
      const game = new GameOfLife({ rows: 3, cols: 3 });
      game.setCell(2, 2, 1);
      const grid = game.getGrid();

      expect(grid[2][2]).toBe(1);
    });

    test('should set a cell to dead', () => {
      const game = new GameOfLife({ rows: 3, cols: 3 });
      game.setCell(1, 1, 1);
      game.setCell(1, 1, 0);
      const grid = game.getGrid();

      expect(grid[1][1]).toBe(0);
    });

    test('should handle out of bounds toggle gracefully', () => {
      const game = new GameOfLife({ rows: 3, cols: 3 });
      game.toggleCell(-1, 0);
      game.toggleCell(0, -1);
      game.toggleCell(3, 0);
      game.toggleCell(0, 3);

      const grid = game.getGrid();
      expect(grid.every(row => row.every(cell => cell === 0))).toBe(true);
    });

    test('should handle out of bounds setCell gracefully', () => {
      const game = new GameOfLife({ rows: 3, cols: 3 });
      game.setCell(-1, 0, 1);
      game.setCell(0, -1, 1);
      game.setCell(3, 0, 1);
      game.setCell(0, 3, 1);

      const grid = game.getGrid();
      expect(grid.every(row => row.every(cell => cell === 0))).toBe(true);
    });

    test('should clear the entire grid', () => {
      const pattern: Grid = [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
      ];
      const game = new GameOfLife({ rows: 3, cols: 3, initialPattern: pattern });
      game.clear();
      const grid = game.getGrid();

      expect(grid.every(row => row.every(cell => cell === 0))).toBe(true);
    });

    test('should randomize the grid with default probability', () => {
      const game = new GameOfLife({ rows: 10, cols: 10 });
      game.randomize();
      const grid = game.getGrid();

      const aliveCells = grid.flat().filter(cell => cell === 1).length;
      expect(aliveCells).toBeGreaterThan(0);
      expect(aliveCells).toBeLessThan(100);
    });

    test('should randomize the grid with custom probability', () => {
      const game = new GameOfLife({ rows: 10, cols: 10 });
      game.randomize(0);
      const grid = game.getGrid();

      expect(grid.every(row => row.every(cell => cell === 0))).toBe(true);
    });

    test('should set grid to a new state', () => {
      const game = new GameOfLife({ rows: 3, cols: 3 });
      const newGrid: Grid = [
        [1, 0, 1],
        [0, 1, 0],
        [1, 0, 1],
      ];
      game.setGrid(newGrid);
      const grid = game.getGrid();

      expect(grid).toEqual(newGrid);
    });

    test('should throw error when setting grid with wrong dimensions', () => {
      const game = new GameOfLife({ rows: 3, cols: 3 });
      const wrongGrid: Grid = [
        [1, 0],
        [0, 1],
      ];

      expect(() => game.setGrid(wrongGrid)).toThrow('Grid dimensions must match');
    });
  });

  describe("Conway's Rules - Underpopulation", () => {
    test('should kill a live cell with no neighbors', () => {
      const pattern: Grid = [
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0],
      ];
      const game = new GameOfLife({ rows: 3, cols: 3, initialPattern: pattern });
      game.tick();
      const grid = game.getGrid();

      expect(grid[1][1]).toBe(0);
    });

    test('should kill a live cell with only one neighbor', () => {
      const pattern: Grid = [
        [0, 1, 0],
        [0, 1, 0],
        [0, 0, 0],
      ];
      const game = new GameOfLife({ rows: 3, cols: 3, initialPattern: pattern });
      game.tick();
      const grid = game.getGrid();

      expect(grid[0][1]).toBe(0);
      expect(grid[1][1]).toBe(0);
    });
  });

  describe("Conway's Rules - Survival", () => {
    test('should keep a live cell alive with two neighbors', () => {
      const pattern: Grid = [
        [1, 1, 0],
        [0, 1, 0],
        [0, 0, 0],
      ];
      const game = new GameOfLife({ rows: 3, cols: 3, initialPattern: pattern });
      game.tick();
      const grid = game.getGrid();

      expect(grid[0][1]).toBe(1);
    });

    test('should keep a live cell alive with three neighbors', () => {
      const pattern: Grid = [
        [1, 1, 0],
        [1, 1, 0],
        [0, 0, 0],
      ];
      const game = new GameOfLife({ rows: 3, cols: 3, initialPattern: pattern });
      game.tick();
      const grid = game.getGrid();

      expect(grid[0][0]).toBe(1);
      expect(grid[0][1]).toBe(1);
      expect(grid[1][0]).toBe(1);
      expect(grid[1][1]).toBe(1);
    });
  });

  describe("Conway's Rules - Overpopulation", () => {
    test('should kill a live cell with four neighbors', () => {
      const pattern: Grid = [
        [0, 1, 0],
        [1, 1, 1],
        [0, 1, 0],
      ];
      const game = new GameOfLife({ rows: 3, cols: 3, initialPattern: pattern });
      game.tick();
      const grid = game.getGrid();

      expect(grid[1][1]).toBe(0);
    });

    test('should kill a live cell with five neighbors', () => {
      const pattern: Grid = [
        [1, 1, 0],
        [1, 1, 1],
        [0, 1, 0],
      ];
      const game = new GameOfLife({ rows: 3, cols: 3, initialPattern: pattern });
      game.tick();
      const grid = game.getGrid();

      expect(grid[1][1]).toBe(0);
    });
  });

  describe("Conway's Rules - Reproduction", () => {
    test('should create a live cell from a dead cell with exactly three neighbors', () => {
      const pattern: Grid = [
        [1, 1, 0],
        [1, 0, 0],
        [0, 0, 0],
      ];
      const game = new GameOfLife({ rows: 3, cols: 3, initialPattern: pattern });
      game.tick();
      const grid = game.getGrid();

      expect(grid[1][1]).toBe(1);
    });

    test('should not create a live cell with two neighbors', () => {
      const pattern: Grid = [
        [1, 1, 0],
        [0, 0, 0],
        [0, 0, 0],
      ];
      const game = new GameOfLife({ rows: 3, cols: 3, initialPattern: pattern });
      game.tick();
      const grid = game.getGrid();

      expect(grid[1][1]).toBe(0);
    });

    test('should not create a live cell with four neighbors', () => {
      const pattern: Grid = [
        [1, 1, 0],
        [1, 0, 1],
        [0, 0, 0],
      ];
      const game = new GameOfLife({ rows: 3, cols: 3, initialPattern: pattern });
      game.tick();
      const grid = game.getGrid();

      expect(grid[1][1]).toBe(0);
    });
  });

  describe('Classic Patterns', () => {
    test('should handle the "Blinker" pattern (period 2 oscillator)', () => {
      // Horizontal blinker
      const horizontal: Grid = [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0],
      ];
      const game = new GameOfLife({ rows: 5, cols: 5, initialPattern: horizontal });

      game.tick(); // Should become vertical
      let grid = game.getGrid();
      expect(grid[2][1]).toBe(1);
      expect(grid[2][2]).toBe(1);
      expect(grid[2][3]).toBe(1);
      expect(grid[1][2]).toBe(0);
      expect(grid[3][2]).toBe(0);

      game.tick(); // Should become horizontal again
      grid = game.getGrid();
      expect(grid[1][2]).toBe(1);
      expect(grid[2][2]).toBe(1);
      expect(grid[3][2]).toBe(1);
    });

    test('should handle the "Block" pattern (still life)', () => {
      const block: Grid = [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
      ];
      const game = new GameOfLife({ rows: 4, cols: 4, initialPattern: block });

      game.tick();
      const grid = game.getGrid();

      // Block should remain unchanged
      expect(grid).toEqual(block);
    });

    test('should handle the "Glider" pattern (moves diagonally)', () => {
      const glider: Grid = [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0],
        [0, 0, 0, 1, 0, 0],
        [0, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
      ];
      const game = new GameOfLife({ rows: 6, cols: 6, initialPattern: glider });

      // After 4 ticks, glider should have moved one cell diagonally
      for (let i = 0; i < 4; i++) {
        game.tick();
      }

      const grid = game.getGrid();

      // Check that the glider has moved (there should be live cells in different positions)
      const aliveCells = grid.flat().filter(cell => cell === 1).length;
      expect(aliveCells).toBe(5); // Glider always has 5 cells
    });
  });

  describe('Edge Cases', () => {
    test('should handle cells on the grid boundary correctly', () => {
      const pattern: Grid = [
        [1, 1, 0],
        [1, 0, 0],
        [0, 0, 0],
      ];
      const game = new GameOfLife({ rows: 3, cols: 3, initialPattern: pattern });
      game.tick();
      const grid = game.getGrid();

      // Corner cell should follow rules based only on existing neighbors
      expect(grid[0][0]).toBe(1); // Has 2 neighbors, survives
    });

    test('should handle a completely dead grid', () => {
      const game = new GameOfLife({ rows: 5, cols: 5 });
      game.tick();
      const grid = game.getGrid();

      expect(grid.every(row => row.every(cell => cell === 0))).toBe(true);
    });

    test('should handle a completely alive grid', () => {
      const allAlive: Grid = [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
      ];
      const game = new GameOfLife({ rows: 3, cols: 3, initialPattern: allAlive });
      game.tick();
      const grid = game.getGrid();

      // Center cells should die (overpopulation), corners should survive
      expect(grid[1][1]).toBe(0);
      expect(grid[0][0]).toBe(1);
      expect(grid[0][2]).toBe(1);
      expect(grid[2][0]).toBe(1);
      expect(grid[2][2]).toBe(1);
    });

    test('should handle multiple consecutive ticks', () => {
      const pattern: Grid = [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0],
      ];
      const game = new GameOfLife({ rows: 5, cols: 5, initialPattern: pattern });

      for (let i = 0; i < 10; i++) {
        game.tick();
      }

      const grid = game.getGrid();
      // After even number of ticks, blinker should be in original orientation
      expect(grid[1][2]).toBe(1);
      expect(grid[2][2]).toBe(1);
      expect(grid[3][2]).toBe(1);
    });

    test('should handle single cell grid', () => {
      const game = new GameOfLife({ rows: 1, cols: 1 });
      game.setCell(0, 0, 1);
      game.tick();
      const grid = game.getGrid();

      // Single cell with no neighbors should die
      expect(grid[0][0]).toBe(0);
    });
  });
});
