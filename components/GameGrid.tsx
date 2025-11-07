'use client';

import { Grid, Cell } from '@/engine/GameOfLife';

interface GameGridProps {
  grid: Grid;
  onCellClick?: (row: number, col: number) => void;
  cellSize?: number;
}

/**
 * Visual component for rendering the Game of Life grid
 * Separated from game logic for clean architecture
 */
export default function GameGrid({ grid, onCellClick, cellSize = 15 }: GameGridProps) {
  const rows = grid.length;
  const cols = grid[0]?.length || 0;

  const handleCellClick = (row: number, col: number) => {
    if (onCellClick) {
      onCellClick(row, col);
    }
  };

  return (
    <div className="inline-block border-2 border-gray-700 bg-gray-900">
      <svg
        width={cols * cellSize}
        height={rows * cellSize}
        className="cursor-pointer"
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <rect
              key={`${rowIndex}-${colIndex}`}
              x={colIndex * cellSize}
              y={rowIndex * cellSize}
              width={cellSize}
              height={cellSize}
              fill={cell === 1 ? '#22c55e' : '#1f2937'}
              stroke="#374151"
              strokeWidth="0.5"
              onClick={() => handleCellClick(rowIndex, colIndex)}
              className="transition-colors duration-100"
            />
          ))
        )}
      </svg>
    </div>
  );
}
