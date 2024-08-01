import { View } from "./../modules/View";
import { getElementByClass, getElementById } from "./MainGui";

class OpenFullScreen extends View {
  isFullScreen: boolean = false;
  constructor() {
    const elem = getElementByClass<HTMLDivElement>("OpenFullScreenButton");

    super("OpenFullScreen", elem);

    this.flexVisibility = false;

    const button = getElementById<HTMLButtonElement>("OpenFullScreenButton");
    const game = getElementById<HTMLDivElement>("game");
    this.show();

    button.onclick = () => {
      game.requestFullscreen();
    };

    game.onfullscreenchange = (evt) => {
      console.log(document.fullscreenElement);
      if (document.fullscreenElement) this.hide();
      else this.show();
    };
  }
}

export default OpenFullScreen;
