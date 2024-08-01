import {
    AnimatedSprite,
    Application,
    Assets,
    Container,
    ObservablePoint,
    Text,
    Texture,
    Ticker,
    TilingSprite,
} from "pixi.js";
import Tank from "../GameObjects/Tank";
import { CreateGameObjectsData } from "../modules/NetworkInterfaces";
import { Player } from "../modules/Player";
import SIOManager from "./SIOManager";
import AssetsManager from "./AssetsManager";
import SyncController from "../modules/SyncController";
import { Enemy, TestEnemy } from "../GameObjects/Enemies";
import { Tilemap } from "@pixi/tilemap";
import WorldMap from "../GameObjects/WorldMap";
import { Gold, Build } from "../GameObjects/Builds";
import { Projectile } from "../GameObjects/Projectiles";
import Logs from "../GameObjects/Logs";
import { BoxGameObject } from "../GameObjects/Box";
import { Box } from "sat";

class GameObjectManager {
    app: Application;
    camera: Container;
    toScale: number;
    gold: Gold;
    initedGame: boolean = false;
    logs: Logs;

    gameObjects: {
        tanks: Array<Tank>;
        projectiles: Array<Projectile>;
        enemies: Array<Enemy>;
        other: Array<null>;
        builds: Array<Build>;
        newGameObjects: Array<BoxGameObject>;
    };
    syncController: SyncController;

    initDataUpdate: boolean = false;
    initData: CreateGameObjectsData;

    onload(app: Application) {
        this.gameObjects = {
            tanks: [],
            projectiles: [],
            enemies: [],
            builds: [],
            other: [],
            newGameObjects: [],
        };

        this.app = app;

        this.camera = new Container();
        app.stage.addChild(this.camera);
        this.logs = new Logs();

        if (this.initDataUpdate) this.init(this.initData);
        // this.camera.pivot.x = 0.5;
        // this.camera.pivot.y = 0.5;
    }

    update(ticker: Ticker) {
        if (this.app.stage == undefined) return;
        const updateObjects = [
            ...this.gameObjects.tanks,
            ...this.gameObjects.enemies,
            ...this.gameObjects.builds,
            ...this.gameObjects.projectiles,
            ...this.gameObjects.newGameObjects,
        ];

        updateObjects.forEach((object) => {
            object.update(ticker);
        });

        this.syncController.update();
    }

    async init(data: CreateGameObjectsData) {
        if (this.initDataUpdate == false) {
            this.initData = data;
            this.initDataUpdate = true;
            return;
        }
        await AssetsManager.loadSprites();

        data.players.forEach((playerData) => {
            const isClientPlayer = playerData.id == SIOManager.playerId;
            const playerGameObject = new Player();
            const player = new Player();

            player.id = playerData.id;
            player.username = playerData.username;

            if (isClientPlayer) {
                SIOManager.ownPlayer = player;
                console.log(SIOManager.ownPlayer);
            } else {
                SIOManager.players.push(player);
            }
        });

        data.gameObjects.tankBodies.forEach((tankBodyData) => {
            let tankBody;
            let isOwnPlayer = SIOManager.playerId == tankBodyData.playerId;
            const player = isOwnPlayer
                ? SIOManager.ownPlayer
                : SIOManager.getPlayerById(tankBodyData.playerId);

            if (player == null) return;

            console.log(this.camera);
            tankBody = new Tank();

            tankBody.id = tankBodyData.id;
            tankBody.posX = tankBodyData.position.x;
            tankBody.posY = tankBodyData.position.y;
            tankBody.rotation = tankBodyData.rotation;
            tankBody.isOwn = isOwnPlayer;
            tankBody.player = player;
            player.tank = tankBody;

            this.gameObjects.tanks.push(tankBody);
        });

        console.log(data);

        // data.gameObjects.newGameObjects.map((objectData) => {
        //   const box = new BoxGameObject();
        //   box.id = objectData.id;
        //   box.sprite.position.set(objectData.position.x, objectData.position.y);
        //   this.gameObjects.newGameObjects.push(box);
        // });

        this.initedGame = true;

        this.syncController = new SyncController();

        this.toScale = 1;

        this.app.ticker.add((ticker) => this.update(ticker));

        this.gold = new Gold();

        this.app.canvas.onwheel = (e) => {
            const zoomSpeed = 0.1;

            if (e.deltaY > 0) {
                this.camera.scale.x -= zoomSpeed;
                this.camera.scale.y -= zoomSpeed;
            } else {
                this.camera.scale.x += zoomSpeed;
                this.camera.scale.y += zoomSpeed;
            }

            this.camera.scale.x = Math.max(
                0.1,
                Math.min(2, this.camera.scale.x)
            );
            this.camera.scale.y = Math.max(
                0.1,
                Math.min(2, this.camera.scale.y)
            );
        };

        const wold = new WorldMap();

        // const waterTextures = [];

        // for (let i = 5; i < 9; i++) {
        //   const texture = Texture.from(`0${i}.png`);

        //   waterTextures.push(texture);
        // }

        // for (let i = 0; i < 10; i++) {
        //   for (let j = 0; j < 10; j++) {
        //     const anim = new AnimatedSprite(waterTextures);

        //     anim.x = i * 32;
        //     anim.y = j * 32;
        //     anim.animationSpeed = 0.1;

        //     anim.gotoAndPlay((Math.random() * 4) | 0);

        //     this.camera.addChild(anim);
        //   }
        // }
    }
}

export default new GameObjectManager();
