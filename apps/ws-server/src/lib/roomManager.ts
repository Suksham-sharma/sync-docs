import WebSocket from "ws";

class RoomManager {
  static instance: RoomManager;

  private Rooms = new Map<string, Set<WebSocket>>();

  static getInstance() {
    if (!this.instance) {
      this.instance = new RoomManager();
    }
    return this.instance;
  }

  private isMemberOfRoom(roomId: string, ws: WebSocket) {
    return this.Rooms.has(roomId) && this.Rooms.get(roomId)!.has(ws);
  }

  handleJoinRoom(roomId: string, ws: WebSocket) {
    if (!this.Rooms.has(roomId)) {
      this.Rooms.set(roomId, new Set());
    }
    this.Rooms.get(roomId)!.add(ws);
    ws.send(`Joined room ${roomId}`);
  }

  handleDocUpdate(data: any, ws: WebSocket) {
    const { roomId, doc } = data;
    if (!this.Rooms.has(roomId))
      return ws.send(`Room ${roomId} does not exist`);

    if (!this.isMemberOfRoom(roomId, ws))
      return ws.send(`You are not a member of room ${roomId}`);

    this.Rooms.get(roomId)!.forEach((client) => {
      if (client !== ws) {
        client.send(JSON.stringify({ type: "doc-update", data: doc }));
      }
    });

    console.log(`Document updated in room ${roomId}`);
  }
}

const roomManager = RoomManager.getInstance();

export default roomManager;
