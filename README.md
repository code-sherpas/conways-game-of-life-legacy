# Conway's Game of Life

An implementation of Conway's Game of Life using Next.js, TypeScript, and React.

## Description

This project implements John Conway's "Game of Life" cellular automaton, clearly separating the game engine logic from the visualization and interface controls.

## Game Rules

The Game of Life universe is an infinite two-dimensional orthogonal grid of square cells, each of which is in one of two possible states: alive or dead. Each cell interacts with its eight neighbors (horizontally, vertically, and diagonally adjacent). At each time step, the following transitions occur:

1. **Underpopulation**: Any live cell with fewer than two live neighbors dies
2. **Survival**: Any live cell with two or three live neighbors survives
3. **Overpopulation**: Any live cell with more than three live neighbors dies
4. **Reproduction**: Any dead cell with exactly three live neighbors becomes a live cell

## Architecture

The project is organized as follows:

- **`engine/GameOfLife.ts`**: Game engine with Conway's logic completely separated from the UI
  - Implements the game rules
  - Manages the grid state
  - Provides methods to manipulate the state

- **`components/GameGrid.tsx`**: Grid visualization component
  - Renders the current game state
  - Handles user interaction with cells

- **`components/GameControls.tsx`**: Control panel
  - Play/Pause to start/stop the simulation
  - Step to advance one generation
  - Clear to reset the grid
  - Randomize to generate a random pattern
  - Speed control

- **`app/page.tsx`**: Main page that integrates all components

## Installation and Running

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Run in production mode
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Usage

1. Click on individual cells to toggle them on/off manually
2. Use the "Randomize" button to generate a random initial pattern
3. Press "Play" to start the simulation
4. Adjust the speed with the slider control
5. Use "Step" to advance one generation at a time
6. Press "Clear" to reset the grid

## Technologies

- Next.js 15
- React 18
- TypeScript 5
- SVG for grid rendering