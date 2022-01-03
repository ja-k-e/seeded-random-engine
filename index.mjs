export default class SeededRandomEngine {
  constructor({ seed = "", cores = 0, memory = 1 } = {}) {
    this.memory = memory;
    this.generation = 0;
    this.history = [];
    this.cores = [];
    for (let i = 0; i < cores; i++) {
      this.cores.push(new Core(seed + i));
    }
  }

  generate() {
    while (this.history.length >= this.memory) {
      this.history.shift();
    }
    const generation = this.cores.map((core) => core.random());
    this.history.push(generation);
    this.generation++;
  }

  values() {
    return this.history[this.history.length - 1];
  }

  ff(generation = 0) {
    while (this.generation < generation) {
      this.generate();
    }
  }
}

// https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
class Core {
  constructor(seed = "") {
    const seedingFunction = this._xmur3(seed);
    this.random = this._sfc32(
      seedingFunction(),
      seedingFunction(),
      seedingFunction(),
      seedingFunction()
    );
  }

  _xmur3(str) {
    for (var i = 0, h = 1779033703 ^ str.length; i < str.length; i++)
      (h = Math.imul(h ^ str.charCodeAt(i), 3432918353)),
        (h = (h << 13) | (h >>> 19));
    return function () {
      h = Math.imul(h ^ (h >>> 16), 2246822507);
      h = Math.imul(h ^ (h >>> 13), 3266489909);
      return (h ^= h >>> 16) >>> 0;
    };
  }

  _sfc32(a, b, c, d) {
    return function () {
      a >>>= 0;
      b >>>= 0;
      c >>>= 0;
      d >>>= 0;
      var t = (a + b) | 0;
      a = b ^ (b >>> 9);
      b = (c + (c << 3)) | 0;
      c = (c << 21) | (c >>> 11);
      d = (d + 1) | 0;
      t = (t + d) | 0;
      c = (c + t) | 0;
      return (t >>> 0) / 4294967296;
    };
  }
}
