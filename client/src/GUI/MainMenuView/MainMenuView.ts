import { View } from "../../modules/View";
import CreateGameView from "./CreateGameView";
import RoomListView from "./RoomListView";

class MainMenuView extends View {
  createGameView: CreateGameView;
  roomListView: RoomListView;

  constructor() {
    const elem = document.getElementById("MainMenu") as HTMLDivElement;
    super("MainMenu", elem);

    //this.createGameView = new CreateGameView();
    this.roomListView = new RoomListView();

    //this.createGameView.show();
    this.roomListView.show();
  }
}

export default MainMenuView;
