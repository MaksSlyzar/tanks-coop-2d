import { Sprite, Ticker } from "pixi.js";
import GameObjectsManager from "../Managers/GameObjectsManager";

class GameObject {
  id: number; // network identificator
  posX: number; // network position X
  posY: number; // network position Y
  rotation: number;
  sprite: Sprite;

  destroySprite() {
    GameObjectsManager.camera.removeChild(this.sprite);
  }

  update(ticker: Ticker) {}
}

export default GameObject;
