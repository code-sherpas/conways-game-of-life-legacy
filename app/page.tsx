'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { GameOfLife } from '@/engine/GameOfLife';
import GameGrid from '@/components/GameGrid';
import GameControls from '@/components/GameControls';

const GRID_ROWS = 40;
const GRID_COLS = 60;
const INITIAL_SPEED = 200;

export default function Home() {
  // Initialize the game engine
  const gameRef = useRef<GameOfLife>(
    new GameOfLife({ rows: GRID_ROWS, cols: GRID_COLS })
  );

  const [grid, setGrid] = useState(gameRef.current.getGrid());
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [generation, setGeneration] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Update the grid display from the engine
  const updateGrid = useCallback(() => {
    setGrid(gameRef.current.getGrid());
  }, []);

  // Advance the simulation by one step
  const step = useCallback(() => {
    gameRef.current.tick();
    setGeneration(prev => prev + 1);
    updateGrid();
  }, [updateGrid]);

  // Handle play/pause
  const handlePlayPause = useCallback(() => {
    setIsRunning(prev => !prev);
  }, []);

  // Handle single step
  const handleStep = useCallback(() => {
    step();
  }, [step]);

  // Handle reset/clear
  const handleReset = useCallback(() => {
    setIsRunning(false);
    gameRef.current.clear();
    setGeneration(0);
    updateGrid();
  }, [updateGrid]);

  // Handle randomize
  const handleRandomize = useCallback(() => {
    gameRef.current.randomize(0.3);
    setGeneration(0);
    updateGrid();
  }, [updateGrid]);

  // Handle cell click
  const handleCellClick = useCallback((row: number, col: number) => {
    if (!isRunning) {
      gameRef.current.toggleCell(row, col);
      updateGrid();
    }
  }, [isRunning, updateGrid]);

  // Handle speed change
  const handleSpeedChange = useCallback((newSpeed: number) => {
    setSpeed(newSpeed);
  }, []);

  // Game loop effect
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        step();
      }, speed);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, speed, step]);

  return (
    <main className="mx-auto min-h-screen p-8 flex justify-center">
      <div className="mx-auto max-w-7xl w-full justify-center">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">Conway&apos;s Game of Life</h1>
          <p className="text-gray-400">
            A cellular automaton simulation based on simple rules that create complex patterns
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-6 items-center justify-center">
          <div className="flex-shrink-0">
            <GameGrid
              grid={grid}
              onCellClick={handleCellClick}
              cellSize={15}
            />
          </div>

          <div className="flex-shrink-0">
            <GameControls
              isRunning={isRunning}
              onPlayPause={handlePlayPause}
              onStep={handleStep}
              onReset={handleReset}
              onRandomize={handleRandomize}
              onSpeedChange={handleSpeedChange}
              speed={speed}
              generation={generation}
            />
          </div>
        </div>

        <section className="mt-8 p-6 bg-gray-800 rounded-lg max-w-3xl">
          <h2 className="text-2xl font-semibold mb-4">The Rules</h2>
          <ul className="space-y-2 text-gray-300">
            <li>
              <strong className="text-green-400">Birth:</strong> A dead cell with exactly 3 live
              neighbors becomes alive
            </li>
            <li>
              <strong className="text-blue-400">Survival:</strong> A live cell with 2 or 3 live
              neighbors stays alive
            </li>
            <li>
              <strong className="text-red-400">Death by underpopulation:</strong> A live cell with
              fewer than 2 neighbors dies
            </li>
            <li>
              <strong className="text-red-400">Death by overpopulation:</strong> A live cell with
              more than 3 neighbors dies
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
