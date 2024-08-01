import { Application, Assets, Sprite } from "pixi.js";
import "./styles/main.scss";
import AssetsManager from "./Managers/AssetsManager";
import GameObjectsManager from "./Managers/GameObjectsManager";
import SIOManager from "./Managers/SIOManager";
import MainGui, { getElementById } from "./GUI/MainGui";

const app = new Application();

app
  .init({
    backgroundColor: 0xd3d3d3,
    width: window.innerWidth - 1,
    height: window.innerHeight - 4,
    eventFeatures: {
      globalMove: true,
      click: true,
      wheel: true,
    },
  })
  .then(() => {
    AssetsManager.loadSprites().then(() => {
      const gameViewElement = getElementById<HTMLDivElement>("GameView");

      gameViewElement.appendChild(app.canvas);

      GameObjectsManager.onload(app);

      SIOManager.run();
    });
  });

window.onload = async (): Promise<void> => {
  console.log(12345);
};
