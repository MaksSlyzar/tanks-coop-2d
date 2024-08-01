import { ProgressBar } from "@pixi/ui";
import GameObjectsManager from "../Managers/GameObjectsManager";
import GameObject from "./GameObject";
import { Graphics } from "pixi.js";

class HpBar {
  progressBar: ProgressBar;
  value: number;
  maxValue: number;

  constructor(width: number) {
    const bg = new Graphics()
      .beginFill(0x0e0b0b)
      .drawRoundedRect(0, 0, width, 8, 25)
      .lineStyle(2, 0x3f3e3e, 2)
      .endFill();

    const fill = new Graphics()
      .beginFill(0x000000)
      .drawRoundedRect(0, 0, width, 8, 25)
      .endFill();

    const progressBar = new ProgressBar({
      bg: bg,
      fill: fill,
      progress: 20,
    });

    this.progressBar = progressBar;

    // this.progressBar.y = -70;

    // GameObjectsManager.app.stage.addChild(progressBar);
  }

  destroySprite(): void {
    GameObjectsManager.app.stage.removeChild(this.progressBar);
  }

  updateHp(value: number, maxValue: number) {
    this.progressBar.progress = (maxValue / 100) * value;
  }

  update(x: number, y: number) {
    // const camera = GameObjectsManager.camera;
    // this.progressBar.x = x - this.progressBar.width / 2 + camera.x;
    // this.progressBar.y = y - 70 + camera.y;
  }
}

export default HpBar;
