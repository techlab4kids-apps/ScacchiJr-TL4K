// FIX: Import the 'Direction' enum to resolve TypeScript errors.
import { Level, Direction } from '../types';

export interface LevelConfig {
  basic: Level[];
  advanced: Level[];
}

export const loadDefaultLevels = async (): Promise<LevelConfig> => {
  try {
    const response = await fetch('./config.json');
    if (!response.ok) {
      throw new Error(`Failed to fetch config.json: ${response.statusText}`);
    }
    const config = await response.json();
    if (config && Array.isArray(config.basic) && Array.isArray(config.advanced)) {
        return config;
    }
    throw new Error('Invalid config format or missing level arrays in config.json');
  } catch (error) {
    console.error("Failed to load default levels:", error);
    // Return an empty structure to prevent crashing. The UI will handle the empty state.
    return { basic: [], advanced: [] };
  }
};

// This solution calculator is for the BASIC mode or for showing hints.
// The advanced mode solution is a sequence of valid moves.
export const calculateSolution = (level: Level): Direction[] => {
  const solution: Direction[] = [];
  const start = level.posizioneIniziale;
  const end = level.posizioneBersaglio;

  let dx = end.x - start.x;
  let dy = end.y - start.y;

  while (dx > 0) {
    solution.push(Direction.RIGHT);
    dx--;
  }
  while (dx < 0) {
    solution.push(Direction.LEFT);
    dx++;
  }
  while (dy > 0) {
    solution.push(Direction.DOWN);
    dy--;
  }
  while (dy < 0) {
    solution.push(Direction.UP);
    dy++;
  }

  return solution;
};
