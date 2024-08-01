import { View } from "../modules/View";
import AuthorizationView from "./Authorization";
import GameEndView from "./GameEndView";
import GameView from "./GameView";
import CreateGameView from "./MainMenuView/CreateGameView";
import MainMenuView from "./MainMenuView/MainMenuView";
import OpenFullScreen from "./OpeFullScreen";
import RoomView from "./RoomView";
import SettingsView from "./SettingsView";

export function getElementById<elementType>(elementId: string): elementType {
  const element = document.getElementById(elementId) as elementType;
  return element;
}

export function getElementByClass<elementType>(
  elementClass: string,
  parrentElement?: HTMLElement
): elementType {
  const element = parrentElement
    ? (parrentElement.getElementsByClassName(elementClass)[0] as elementType)
    : (document.getElementsByClassName(elementClass)[0] as elementType);

  return element;
}

class MainGui {
  views: Array<View> = [];

  constructor() {
    this.appendView(new MainMenuView());
    this.appendView(new SettingsView());
    this.appendView(new GameView());
    this.appendView(new AuthorizationView());
    this.appendView(new RoomView());
    this.appendView(new GameEndView());
    this.appendView(new OpenFullScreen());
    this.appendView(new CreateGameView());

    this.changeView("Authorization");
    // this.gameViewDebugMode();
  }

  gameViewDebugMode() {
    this.views.map((view) => {
      view.hide();

      if (view.name == "Game") view.show();
    });
  }

  appendView(view: View) {
    this.views.push(view);
  }

  changeView(viewName: string) {
    for (const view of this.views) {
      if (view.flexVisibility == false) continue;
      if (view.name != viewName) view.hide();
      else {
        view.show();
        view.onShow();
      }
    }
  }
}

export default new MainGui();
