export = SeededRandomEngine;

interface SeededRandomEngineProps {
  cores?: number;
  memory?: number;
  seed?: string;
}

declare class Core {
  constructor(seed?: string);
  random(): number;
}

declare class SeededRandomEngine {
  constructor(props?: SeededRandomEngineProps);
  cores: Core[];
  generation: number;
  history: number[][];
  memory: number;
  ff(generation?: number): void;
  generate(): void;
  values(): number[];
}
