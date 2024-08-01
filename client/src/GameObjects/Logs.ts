import { Text } from "pixi.js";
import GameObjectsManager from "../Managers/GameObjectsManager";

class Logs {
  text: Text;
  logs: Array<string> = [];
  logText: Text;

  constructor() {
    const title = GameObjectsManager.app.stage.addChild(
      new Text({
        text: `-------LOGS-------`,
        style: {
          fontSize: 16,
        },
      })
    );

    title.x = 2;

    this.logText = GameObjectsManager.app.stage.addChild(
      new Text({
        text: "",
        style: {
          fontSize: 14,
        },
      })
    );

    this.logText.y = 20;
    this.logText.x = 2;

    this.logText.text = "Hello world";

    this.logText.zIndex = 1;
  }

  update() {
    this.logText.text = this.logs.join("\n");
  }

  addLog(text: string) {
    this.logs.push(text);
    this.update();
  }

  clear() {
    this.logs = [];
    this.update();
  }
}

export default Logs;
