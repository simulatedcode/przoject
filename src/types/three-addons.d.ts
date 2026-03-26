declare module 'three/addons/misc/Timer.js' {
  export class Timer {
    constructor();
    update(): void;
    getElapsed(): number;
    getDelta(): number;
    setTimescale(timescale: number): void;
    reset(): void;
    disableFixedDelta(): void;
    enableFixedDelta(): void;
    setFixedDelta(fixedDelta: number): void;
  }
}
