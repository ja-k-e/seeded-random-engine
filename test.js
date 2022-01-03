import Engine from "./SeededRandomEngine.js";

const engine = new Engine({
  seed: "some string", // the seed is unique to the game
  cores: 4, // the max amount of random numbers needed per round
  memory: 10, // how many generations of history i want to save in memory
});

engine.update(); // calls random for each core rng
console.log(engine.values());


engine.ff(100); // fast forward the engine to generation 100
console.log(engine.values());
