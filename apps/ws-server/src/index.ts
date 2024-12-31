import http from "http";
import WebSocket, { RawData, WebSocketServer } from "ws";
import { handleIncomingRequest } from "./lib/helpers";

const server = http.createServer();
const wss = new WebSocketServer({ server });

wss.on("connection", (ws: WebSocket) => {
  console.log(`New client connected ${Date.now()}`);
  ws.send("Welcome to the server");

  ws.on("error", console.error);

  ws.on("message", (message: RawData) => {
    handleIncomingRequest(message, ws);
  });
});

server.listen(8080, () => {
  console.log("Server is running on port 8080");
});
