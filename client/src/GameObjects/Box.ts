import { Assets, Sprite, Ticker } from "pixi.js";
import GameObject from "./GameObject";
import AssetsManager from "../Managers/AssetsManager";
import GameObjectsManager from "../Managers/GameObjectsManager";

export class BoxGameObject extends GameObject {
    sprite: Sprite;

    constructor() {
        super();
        this.sprite = Sprite.from(AssetsManager.box);
        this.sprite.anchor.set(0.5);

        GameObjectsManager.camera.addChild(this.sprite);
    }

    update(ticker: Ticker): void {
        if (this.posX == undefined) return;
        if (this.posY == undefined) return;
        this.sprite.x += (this.posX - this.sprite.x) * 0.5;
        this.sprite.y += (this.posY - this.sprite.y) * 0.5;
        this.sprite.rotation = this.rotation;

        // this.container.x +=
        //     (this.sprite.width / 2 + (this.posX - this.container.x)) * 0.1;

        // this.container.y +=
        //     (this.sprite.height / 2 + (this.posY - this.container.y)) * 0.1;

        // this.sprite.rotation = this.rotation;

        // this.hpBar.update(this.sprite.x, this.sprite.y);
        // this.hpBar.updateHp(this.hp, this.maxHp);
    }
}
