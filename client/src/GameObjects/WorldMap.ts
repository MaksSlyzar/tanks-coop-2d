import {
  AnimatedSprite,
  Container,
  DEPRECATED_SCALE_MODES,
  roundPixelsBit,
  Sprite,
  Texture,
  TextureUvs,
  TilingSprite,
} from "pixi.js";
import GameObject from "./GameObject";
import AssetsManager from "../Managers/AssetsManager";
import { Tilemap } from "@pixi/tilemap";
import GameObjectsManager from "../Managers/GameObjectsManager";

const tilesMeta: {
  [key: string]: { x: number; y: number };
} = {
  "0": { x: 0, y: 0 },
  "1": { x: -32, y: 0 },
  "2": { x: -64, y: 0 },
  "3": { x: -96, y: 0 },
  "4": { x: -128, y: 0 },
};

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
function calculatePercentage(part: number, whole: number) {
  return (part / whole) * 100;
}

function getRandomWithPercentage(
  table: Array<{
    value: any;
    percentage: number;
  }>
) {
  let lastItemPercentage = 0;
  let newTable: number[] = table.map((item, index) => {
    const chance = item.percentage + lastItemPercentage;

    lastItemPercentage = item.percentage + lastItemPercentage;

    return chance;
  });

  const rand = getRandomInt(0, lastItemPercentage);

  let trueOutput = 0;
  let output = 0;
  const calc = newTable.map((item, index) => {
    if (rand <= item && rand >= output) {
      trueOutput = index;
    }

    output = item;
  });

  return table[trueOutput].value;
}

class WorldMap extends GameObject {
  container: Container;

  constructor() {
    super();
    this.container = new Container();
    this.container.zIndex = -1;
    this.spawn();
    GameObjectsManager.camera.addChild(this.container);
  }

  getTile(tileData: { x: number; y: number }) {
    return TilingSprite.from(AssetsManager.tilingSprite, {
      tilePosition: tileData,
      width: 32,
      height: 32,
      roundPixels: false,
    });
  }

  spawn() {
    const wom: number[][] = [];

    const table = [
      { value: 0, percentage: 50 },
      { value: 1, percentage: 50 },
      { value: 2, percentage: 20 },
      { value: 4, percentage: 900 },
      { value: 5, percentage: 1 },
    ];

    let percentage = 0;

    for (let y = 0; y < 10 * 10; y++) {
      if (calculatePercentage(y, 100 * 100) != percentage) {
        percentage = calculatePercentage(y, 100 * 100);
      }
      wom.push([]);
      for (let x = 0; x < 10 * 10; x++) {
        if (y == 0 || x == 0) wom[y].push(3);
        else wom[wom.length - 1].push(getRandomWithPercentage(table));
      }
    }

    const textures: { [key: string]: Texture } = {};
    const waterTextures = [];

    for (let i = 5; i < 9; i++) {
      const texture = Texture.from(`0${i}.png`);

      waterTextures.push(texture);
    }

    for (let ind = 0; ind <= 4; ind++) {
      textures[ind] = Texture.from(`terr_${ind + 1}.png`);
    }

    for (let _y = 0; _y < wom.length; _y++) {
      for (let _x = 0; _x < wom[_y].length; _x++) {
        const tileType = wom[_y][_x];
        if (tileType == 5) {
          const anim = new AnimatedSprite(waterTextures);

          anim.x = Math.floor(_x * 32);
          anim.y = Math.floor(_y * 32);
          anim.animationSpeed = 0.07;
          anim.zIndex = 1;
          anim.texture.baseTexture.scaleMode = DEPRECATED_SCALE_MODES.NEAREST;

          anim.play();
          this.container.addChild(anim);
          continue;
        }
        const sprite = new Sprite(textures[tileType]);

        sprite.x = Math.floor(_x * 32);
        sprite.y = Math.floor(_y * 32);
        sprite.texture.baseTexture.scaleMode = DEPRECATED_SCALE_MODES.NEAREST;
        this.container.addChild(sprite);
      }
    }
  }
}

export default WorldMap;
