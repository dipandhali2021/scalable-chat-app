import { Server, Socket } from "socket.io";
import { Redis } from "ioredis";
import prismaClient from "./prisma.js";

const pub = new Redis({
    host: "localhost",
    port: 6379,
});

const sub = new Redis({
    host: "localhost",
    port: 6379,
});

class SocketService {
    private _io: Server;
    constructor() {
        console.log("Init Socket Service....");
        this._io = new Server({
            cors: {
                allowedHeaders: ["*"],
                origin: "*",
                methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
            }
        });
        sub.subscribe("MESSAGES");
    }

    public initListeners() {
        const io = this._io;
        console.log("Initializing Socket Listeners...");

        io.on("connect", socket => {
            console.log(`New Client connected [id=${socket.id}]`);
            socket.on("event:message", async ({ message }: { message: string }) => {
                console.log(`Message received: ${message}`);
                // Publish message to Redis
                await pub.publish("MESSAGES", JSON.stringify({ message }));
            })
        });

        sub.on("message", async (channel, message) => {
            if (channel === "MESSAGES") {
                console.log(`Message from Redis: ${message}`);
                io.emit("message", message);
                await prismaClient.message.create({
                    data: {
                        text: JSON.parse(message).message
                    }
                });
            }
        }); 
    }
    get io() {
        return this._io;
    }
}

export default SocketService;