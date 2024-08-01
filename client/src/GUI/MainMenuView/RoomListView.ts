import SIOManager from "../../Managers/SIOManager";
import MainGui from "../MainGui";
import { View } from "./../../modules/View";

class RoomListView extends View {
  constructor() {
    console.log(document);
    const elem = document.getElementById("RoomListView") as HTMLDivElement;
    console.log(elem);
    super("RoomList", elem);

    const listDiv = elem.getElementsByClassName(
      "MainMenu__RoomListView-list"
    )[0] as HTMLDivElement;

    const usernameLabel = elem.getElementsByClassName(
      "MainMenu__RoomListView-bottom-panel-username"
    )[0] as HTMLDivElement;

    SIOManager.socket.on("updateRoomList", (data) => {
      MainGui.changeView("MainMenu");
      usernameLabel.innerText = SIOManager.username;

      const { roomsData } = data;

      listDiv.innerHTML = "";

      roomsData.map((room: { roomName: string; players: string[] }) => {
        const roomItem = document.createElement("div");

        roomItem.classList.add("MainMenu__RoomListView-item");
        roomItem.innerText = room.roomName;
        const _joinButton = document.createElement(
          "button"
        ) as HTMLButtonElement;

        _joinButton.innerText = "Join";

        roomItem.appendChild(_joinButton);

        _joinButton.onclick = () => {
          SIOManager.socket.emit("joinRoom", { lobbyCode: room.roomName });
        };

        listDiv.append(roomItem);
      });
    });
  }
}

export default RoomListView;
