import WebSocket, { RawData } from "ws";
import roomManager from "./roomManager";

export function handleIncomingRequest(message: RawData, ws: WebSocket) {
  const { type: event, data } = JSON.parse(message.toString());

  switch (event) {
    case "join-room":
      roomManager.handleJoinRoom(data, ws);
      break;
    case "doc-update":
      roomManager.handleDocUpdate(data, ws);
      break;
    default:
      ws.send("Invalid event type");
  }
}
