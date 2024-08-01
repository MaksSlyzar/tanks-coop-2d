import { AnimatedSprite, Sprite, Texture, Ticker } from "pixi.js";
import GameObject from "./GameObject";
import AssetsManager from "../Managers/AssetsManager";
import GameObjectsManager from "../Managers/GameObjectsManager";
import { DropShadowFilter } from "pixi-filters";

export class Projectile extends GameObject {
  sprite: Sprite;

  shootSmoke(x: number, y: number, rotatation: number) {
    const textures = [];

    for (let i = 1; i <= 4; i++) {
      const texture = Texture.from(`shoot_smoke (${i}).png`);

      textures.push(texture);
    }

    // const anim = new AnimatedSprite(textures);

    // anim.anchor.set(0.5, 0.5);
    // anim.position.set(x, y);
    // anim.animationSpeed = 0.6;

    // anim.rotation = rotatation;
    // anim.loop = false;

    // anim.onComplete = () => {
    //   GameObjectsManager.camera.removeChild(anim);
    //   anim.destroy();
    // };

    // // anim.gotoAndPlay((Math.random() * 4) | 0);
    // anim.play();
    // GameObjectsManager.camera.addChild(anim);
  }
}

export class TestProjectile extends Projectile {
  constructor() {
    super();
    console.log("spawn");
    this.sprite = Sprite.from(AssetsManager.testProjectile);

    const shadowFilter = new DropShadowFilter({
      color: 0x000000,
      alpha: 2.5,
      blur: 5,
      quality: 5,
    });
    this.sprite.filters = [shadowFilter];
    GameObjectsManager.camera.addChild(this.sprite);
  }

  update(ticker: Ticker): void {
    this.sprite.rotation = this.rotation;
    this.sprite.x += (this.posX - this.sprite.x) * 0.2;
    this.sprite.y += (this.posY - this.sprite.y) * 0.2;
    // this.sprite.x += (this.posX - this.sprite.x) * ticker.deltaTime;
    // this.sprite.y += (this.posY - this.sprite.y) * ticker.deltaTime;
  }
}
