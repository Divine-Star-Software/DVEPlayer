class ContronEvent {
  funcs: Function[] = [];

  add(func: Function) {
    this.funcs.push(func);
  }
  run() {
    for (const func of this.funcs) {
      func();
    }
  }
}

export class ControlManager {
  mouse = {
    left: {
      down: new ContronEvent(),
      up: new ContronEvent(),
    },
    right: {
        down: new ContronEvent(),
        up: new ContronEvent(),
      },
  };
}
