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
    });
});
