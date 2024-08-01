import {
    AnimatedSprite,
    Container,
    Filter,
    Graphics,
    Sprite,
    Texture,
    Ticker,
} from "pixi.js";
import GameObjectsManager from "../Managers/GameObjectsManager";
import GameObject from "./GameObject";
import AssetsManager from "../Managers/AssetsManager";
import { Player } from "../modules/Player";
import { List, ProgressBar } from "@pixi/ui";
import HpBar from "./HpBar";
import { DropShadowFilter } from "pixi-filters";

class Tank extends GameObject {
    sprite: Sprite;
    weapon: Weapon;
    player: Player;
    isOwn: boolean = false;
    hp: number;
    hpMax: number;
    hpBar: HpBar;
    container: Container;
    tracks: Array<{
        sprite: Sprite;
        life: number;
    }> = [];
    timeSinceLastTrack: number = 0;

    constructor() {
        super();
        this.sprite = Sprite.from(AssetsManager.heavyTankBody);
        console.log(this.sprite, "sprite");
        this.weapon = new Weapon(this);

        this.container = new Container();
        this.container.addChild(this.sprite);

        GameObjectsManager.camera.addChild(this.container);
        this.sprite.anchor = 0.5;
        this.hpBar = new HpBar(150);

        this.hpBar.progressBar.x =
            this.sprite.x - this.hpBar.progressBar.width / 2;
        this.hpBar.progressBar.y = -70;

        this.container.addChild(this.hpBar.progressBar);

        const shadowFilter = new DropShadowFilter({
            color: 0x000000,
            alpha: 1.5,
            blur: 5,
            quality: 5,
        });
        this.sprite.filters = [shadowFilter];

        const tankGoTextures = [];
        let i;

        for (i = 1; i <= 2; i++) {
            const texture = Texture.from(`tank_go_${i}.png`);
            tankGoTextures.push(texture);
        }

        const tankGoLeft = new AnimatedSprite(tankGoTextures);
        tankGoLeft.anchor.x = 0.5;
        tankGoLeft.anchor.y = 0.5;
        tankGoLeft.animationSpeed = 0.2;
        tankGoLeft.y = -30;
        tankGoLeft.play();
        // tankGoLeft.gotoAndPlay((Math.random() * 2) | 0);

        this.sprite.addChild(tankGoLeft);

        const tankGoRight = new AnimatedSprite(tankGoTextures);
        tankGoRight.anchor.x = 0.5;
        tankGoRight.anchor.y = 0.5;
        tankGoRight.animationSpeed = 0.2;
        tankGoRight.y = +30;
        tankGoRight.scale = -1;
        tankGoRight.play();
        // tankGoLeft.gotoAndPlay((Math.random() * 2) | 0);

        this.sprite.addChild(tankGoRight);
    }

    update(ticker: Ticker): void {
        this.hpBar.updateHp(this.hp, this.hpMax);
        this.container.x += (this.posX - this.container.x) * 0.5;

        this.container.y += (this.posY - this.container.y) * 0.5;

        this.sprite.rotation +=
            (this.rotation - this.sprite.rotation) * ticker.deltaTime;

        this.weapon.update(ticker);

        if (this.isOwn) {
            const camera = GameObjectsManager.camera;
            const app = GameObjectsManager.app;

            camera.x = -this.container.x * camera.scale.x + app.view.width / 2;
            camera.y = -this.container.y * camera.scale.y + app.view.height / 2;
        }

        const trackSpawnInterval = 1000 / 50;

        this.timeSinceLastTrack += ticker.deltaTime * (1000 / 60);

        if (this.timeSinceLastTrack >= trackSpawnInterval) {
            this.addTrack(
                this.container.x + 20,
                this.container.y + 30,
                this.sprite.rotation
            );

            this.addTrack(
                this.container.x - 20,
                this.container.y - 30,
                this.sprite.rotation
            );
            this.timeSinceLastTrack = 0;
        }

        for (let i = this.tracks.length - 1; i >= 0; i--) {
            const track = this.tracks[i];
            track.life -= ticker.deltaTime;

            if (track.life <= 0) {
                GameObjectsManager.camera.removeChild(track.sprite);
                this.tracks.splice(i, 1);
            }
        }
    }

    addTrack(x: number, y: number, rotation: number) {
        const track = Sprite.from(AssetsManager.trackStep);

        track.x = x;
        track.y = y;
        track.rotation = rotation;
        track.zIndex = -1;
        track.anchor.set(0.5, 0.5);

        GameObjectsManager.camera.addChild(track);
        this.tracks.push({ sprite: track, life: 100 });
    }
}

class Weapon extends GameObject {
    tank: Tank;
    sprite: Sprite;

    constructor(tank: Tank) {
        super();
        this.tank = tank;
        this.sprite = Sprite.from(AssetsManager.heavyTankWeapon);

        this.tank.sprite.addChild(this.sprite);
        this.sprite.zIndex = 3;
        this.sprite.anchor.x = +0.2;
        this.sprite.anchor.y = 0.5;
    }

    update(ticker: Ticker): void {
        this.sprite.rotation = this.rotation;
    }
}

export default Tank;
