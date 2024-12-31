import { createClient, type RedisClientType } from "redis";

class RedisManager {
  static instance: RedisManager;

  private queueClient: RedisClientType;

  constructor() {
    this.queueClient = createClient({});

    this.queueClient.on("conmect", () => {
      console.log("Redis connected successfully");
    });
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new RedisManager();
    }
    return this.instance;
  }
}
