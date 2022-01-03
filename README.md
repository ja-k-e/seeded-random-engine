# Seeded Random Engine

> An array of seeded random number generators that can enable multiple devices to be primitively synchronized.

## Example usage

```js
const engine = new SeededRandomEngine({
  // The seed is unique to the instance.
  seed: "A unique case sensitive string",
  // Maximum amount of random numbers needed per generation.
  cores: 4,
  // Generations of history to save in memory.
  // Useful if you need to recall past generations.
  memory: 10,
});

// Generate a first generation of four random numbers (four "cores" provided above).
engine.generate();
// engine.values() will return an array of four random numbers.
console.log(engine.values());
// eg. [0.3230205841828137, 0.2185600262600928, 0.1377083600964397, 0.9505280032753944]

// Fast forward the engine to generation 57
engine.ff(57);
// Any engine sharing this seed and set to generation 57 will always yield the same values.
console.log(engine.values());
// Call engine.generate() to increase the generation and generate numbers.
engine.generate();
// Current generation is now 58 and values() returns four new numbers.
console.log(engine.values());
```

## What is this useful for?

Say we want a number of devices to see the same new random number every time a button is pressed.

One way we could do this would be to randomly generate a number and update the devices over the network solution using something like web sockets. That solution, while valid, is somewhat overkill if all I need is a synchronized random number generator.

Enter the seeded random engine. The concept is that if devices share a seed, multiple random number generators (RNGs) can be synchronised between the devices.

A seeded RNG can also be "fast forwarded." This means if a new device wants to join others, the others share the seed and the current "generation" (how many times the engine has been used), and the new device can catch up.

The core use case for this engine is one where human beings can do that sync easily together. I can tell my friend "enter seed 'willie' and we are at generation 100." With two small inputs, my friend can sync their device with everyone else and be looking at the exact same randomized data.
