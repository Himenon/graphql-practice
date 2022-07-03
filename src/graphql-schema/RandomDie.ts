export class RandomDie {
  constructor(private numSides: number) {}

  rollOnce() {
    return 1 + Math.floor(Math.random() * this.numSides);
  }

  roll(numRolls: number) {
    const output = [];
    for (let i = 0; i < numRolls; i++) {
      output.push(this.rollOnce());
    }
    return output;
  }
}
