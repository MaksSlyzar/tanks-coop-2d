import { View } from "../modules/View";
import MainGui, { getElementById } from "./MainGui";

// const settingsIcon = require("../assets/settings-icon.svg");
import settingsIcon from "./../assets/settings-icon.svg";

class SettingsView extends View {
  constructor() {
    const elem = getElementById<HTMLDivElement>("Settings");
    super("Settings", elem);

    const button = getElementById<HTMLButtonElement>("showSettingsButton");
    const image = document.createElement("img");

    image.src = settingsIcon;
    image.width = 50;
    image.height = 50;

    button.appendChild(image);
    button.onclick = () => {
      MainGui.changeView("Settings");
    };

    this.hide();
  }
}

export default SettingsView;
