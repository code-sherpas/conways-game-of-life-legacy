'use client';

interface GameControlsProps {
  isRunning: boolean;
  onPlayPause: () => void;
  onStep: () => void;
  onReset: () => void;
  onRandomize: () => void;
  onSpeedChange: (speed: number) => void;
  speed: number;
  generation: number;
}

/**
 * Control panel component for the Game of Life simulation
 */
export default function GameControls({
  isRunning,
  onPlayPause,
  onStep,
  onReset,
  onRandomize,
  onSpeedChange,
  speed,
  generation
}: GameControlsProps) {
  return (
    <div className="flex flex-col gap-4 p-4 bg-gray-800 rounded-lg">
      <div className="flex items-center gap-3">
        <span className="text-gray-300 font-semibold">Generation: {generation}</span>
      </div>

      <div className="flex gap-2 flex-wrap">
        <button
          onClick={onPlayPause}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium transition-colors"
        >
          {isRunning ? 'Pause' : 'Play'}
        </button>

        <button
          onClick={onStep}
          disabled={isRunning}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-md font-medium transition-colors"
        >
          Step
        </button>

        <button
          onClick={onReset}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium transition-colors"
        >
          Clear
        </button>

        <button
          onClick={onRandomize}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md font-medium transition-colors"
        >
          Randomize
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-gray-300 font-medium">
          Speed: {speed}ms
        </label>
        <input
          type="range"
          min="50"
          max="1000"
          step="50"
          value={speed}
          onChange={(e) => onSpeedChange(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="text-sm text-gray-400 mt-2">
        <p className="font-semibold mb-1">Instructions:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Click cells to toggle them alive/dead</li>
          <li>Use Play to start the simulation</li>
          <li>Use Step to advance one generation</li>
          <li>Randomize creates a random pattern</li>
        </ul>
      </div>
    </div>
  );
}
