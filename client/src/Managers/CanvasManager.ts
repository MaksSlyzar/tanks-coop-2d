interface KeyValue {
  [key: string]: boolean;
}
class CanvasManager {
  public context: CanvasRenderingContext2D | null;
  public canvas: HTMLCanvasElement;
  public gameDiv: HTMLElement | null;
  public mouse: { x: number; y: number };
  public keysString: KeyValue = {};

  denyKeys() {
    this.keysString = {};
  }
  allowKeys() {}
  constructor() {
    this.mouse = {
      x: 0,
      y: 0,
    };
    // this.canvas = document.getElementById("canvas") as HTMLCanvasElement;

    // this.context = this.canvas.getContext("2d");
    // this.gameDiv = document.getElementById("gameDiv");

    this.setCanvasEvents();
    // this.windowResizeUpdate();
  }

  setCanvasEvents() {
    // window.onresize = this.windowResizeUpdate;
    window.onmousemove = (evt) => {
      this.mouse.x = evt.clientX;
      this.mouse.y = evt.clientY;
    };
    window.onkeydown = (evt) => {
      // if (!this.events.keyEventsOn) return;

      this.keysString[evt.key] = true;
    };
    window.onkeyup = (evt) => {
      // this.events.keyUpCallbacks.map((cb) => cb(evt.keyCode));

      if (!this.keysString[evt.key]) return;
      this.keysString[evt.key] = false;
    };
  }
  //   windowResizeUpdate() {
  //     this.canvas.width = window.innerWidth;
  //     this.canvas.height = window.innerHeight;
  //   }
  clear() {
    this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  keyDown(char: string) {
    return this.keysString[char];
  }
  start() {}
}
export default new CanvasManager();
