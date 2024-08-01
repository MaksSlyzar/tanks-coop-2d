import { Sprite } from "pixi.js";
import AssetsManager from "../Managers/AssetsManager";
import GameObject from "./GameObject";
import GameObjectsManager from "../Managers/GameObjectsManager";

export class Build extends GameObject {}

export class Gold extends Build {
  sprite: Sprite;

  constructor() {
    super();
    this.sprite = Sprite.from(AssetsManager.gold);

    const stage = GameObjectsManager.camera;

    stage.addChild(this.sprite);
  }
}

export class Base extends Build {
  sprite: Sprite;

  constructor() {
    super();

    this.sprite = Sprite.from(AssetsManager.baseBuild);

    const stage = GameObjectsManager.camera;

    // stage.addChild(this.sprite);
  }

  update() {
    this.sprite.x = this.posX;
    this.sprite.y = this.posY;
  }
}
