import { Assets, Container, Sprite, Ticker } from "pixi.js";
import GameObject from "./GameObject";
import AssetsManager from "../Managers/AssetsManager";
import GameObjectsManager from "../Managers/GameObjectsManager";
import HpBar from "./HpBar";

export class Enemy extends GameObject {
  sprite: Sprite;
  hp: number = 20;
  maxHp: number = 100;

  constructor() {
    super();
  }
}

export class TestEnemy extends Enemy {
  hpBar: HpBar;
  container: Container;

  constructor() {
    super();
    this.sprite = Sprite.from(AssetsManager.testEnemy);
    this.container = new Container();
    this.container.addChild(this.sprite);
    GameObjectsManager.camera.addChild(this.container);
    this.hpBar = new HpBar(80);
    this.sprite.anchor.set(0.5);
    this.hpBar.progressBar.x = this.sprite.x - this.hpBar.progressBar.width / 2;
    this.hpBar.progressBar.y = -25;
    this.container.addChild(this.hpBar.progressBar);
  }

  update(ticker: Ticker): void {
    this.container.x += (this.posX - this.container.x) * 0.1;
    this.container.y += (this.posY - this.container.y) * 0.1;
    this.sprite.rotation = this.rotation;

    // this.hpBar.update(this.sprite.x, this.sprite.y);
    this.hpBar.updateHp(this.hp, this.maxHp);
  }
}
