import { Assets, Sprite } from "pixi.js";
import gold from "./../assets/gold.png";
import heavyTankBody from "./../assets/heavy-tank-body.png";
import heavyTankWeapon from "./../assets/heavy-tank-weapon.png";
import grassSheet from "./../assets/grass-sheet.png";
import testEnemy from "./../assets/test-enemy.png";
import baseBuild from "./../assets/base-build.png";
import projectile from "./../assets/projectile.png";
import waterAnim from "./../assets/tiles/WaterAnim/texture.json";
import trackStep from "./../assets/track_step.png";
import box from "./../assets/boxnew.png";

class AssetsManager {
  gold: string;
  heavyTankBody: string;
  heavyTankWeapon: string;
  tilingSprite: string;
  testEnemy: string;
  baseBuild: string;
  testProjectile: string;
  waterAnim: string;
  trackStep: string;
  box: string;

  async loadSprites() {
    console.log("error");
    try {
      await Assets.load(gold);
      await Assets.load(heavyTankBody);
      await Assets.load(heavyTankWeapon);
      await Assets.load(grassSheet);
      await Assets.load(testEnemy);
      await Assets.load(baseBuild);
      await Assets.load(projectile);
      await Assets.load(trackStep);
      await Assets.load("/src/assets/tiles/WaterAnim/texture.json");
      await Assets.load("/src/assets/tiles/static/texture.json");
      await Assets.load("/src/assets/tiles/tank_go/texture.json");
      await Assets.load("/src/assets/tiles/shoot_smoke/shoot_smoke.json");
      await Assets.load(box);

      this.gold = gold;
      this.heavyTankBody = heavyTankBody;
      this.heavyTankWeapon = heavyTankWeapon;
      this.tilingSprite = grassSheet;
      this.testEnemy = testEnemy;
      this.baseBuild = baseBuild;
      this.testProjectile = projectile;
      this.trackStep = trackStep;
      this.box = box;
    } catch (e) {
      console.log(e);
    }

    console.log(this.gold);
  }
}

export default new AssetsManager();
