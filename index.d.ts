declare module "seeded-random-engine" {
  interface SeededRandomEngineProps {
    cores?: number;
    memory?: number;
    seed?: string;
  }
  
  class SeededRandomEngineCore {
    constructor(seed?: string);
    random(): number;
  }
  
  class SeededRandomEngine {
    constructor(props?: SeededRandomEngineProps);
    cores: SeededRandomEngineCore[];
    generation: number;
    history: number[][];
    to(generation?: number): void;
    generate(): void;
    values(): number[];
  }
}  
