# Seeded Random Engine

> What is this?

Seeded Random Engine is an array of seeded random number generators that can enable multiple devices to be primitively synchronized. An example:

I want two devices to see the same new random number every time a button is pressed.

One way I could do this would be to randomly generate a number and update the devices via web sockets or some other cloud based solution. That solution, while valid, is somewhat overkill if all I need is a synchronized random number generator.

Enter the seeded random engine. The concept is that if devices share a seed, multiple random number generators can be synchronised between the devices.

A seeded random number generator can be "fast forwarded." This means if a new device wants to join others, the others share the seed and the current "generation" (how many times the engine has been used), and the new device can catch up. This is the sort of thing we often program but that requires device -> device communication. The core use case for this engine is one where human beings can do that sync easily together. I can tell my friend "enter seed 'willie' and we are at generation 100." With two small inputs, my friend can sync their device with ours and be looking at the exact same data.

The only important information you need up front with the Seeded Random Engine is how many instances of random you need each generation. If I have a game that uses a random number 16 times per round, that number would be 16 and each round is a generation. If I only need one random number per generation, then it is one!

If I have a game that grows in complexity and needs more randomness each round, then I need as many instances as whatever the max amount of random numbers per round is.

## Example usage

```js
const engine = new Engine({
  seed: "some string", // the seed is unique to the game
  cores: 4, // the max amount of random numbers needed per round
  memory: 10, // how many generations of history i want to save in memory
});

engine.update(); // calls random for each core rng
console.log(engine.values());

/*
 values is something like: 
  [
    0.3230205841828137, 0.2185600262600928,
    0.1377083600964397=, 0.9505280032753944,
  ]
 */

engine.ff(100); // fast forward the engine to generation 100
// this engine at generation 100 will always yield the same thing
console.log(engine.values());
/* 
  values is four new random numbers
*/
```
