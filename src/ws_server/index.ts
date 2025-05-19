import { WebSocket, WebSocketServer } from "ws";
import { registrationService } from "./registration";
import { createRoom, addUserToRoom } from "./rooms";
//import {userDb} from './registration';
//import fs from 'fs';

export enum WsSendCommands {
  REG = 'reg',
  UPDATE_WINNERS = 'update_winners',
  UPDATE_ROOM = 'update_room',
  CREATE_GAME = 'create_game',
  START_GAME = 'start_game',
  TURN = 'turn',
  ATTACK = 'attack',
  FINISH = 'finish',
}

export enum WsReceiveCommands {
  REG = 'reg',
  CREATE_ROOM = 'create_room',
  ADD_USER_TO_ROOM = 'add_user_to_room',
  ADD_SHIPS = 'add_ships',
  ATTACK = 'attack',
  RANDOM_ATTACK = 'randomAttack',
}

export const wsServer = new WebSocketServer({ port: 3000 });
console.log("WebSocket server started on ws://localhost:3000");

export const wsServerRun = () => {
    wsServer.on("connection", (ws:WebSocket) => {
        console.log("Client connected");

        ws.on("message", (message) => {
            const parseMes = JSON.parse(message.toString());
            const { type, data } = parseMes;
            // fs.writeFile('./userDb.txt', JSON.stringify(userDb), function(err) {
            //     if (err) {
            //         console.log('ошибка');
            //     }
            // });
            command(ws, type, data);
            
        });

        ws.on("close", () => {
        console.log("Client disconnected");
        });

        ws.on("error", (error) => {
        console.error("Error", error);
        });

    });
};

process.on("SIGINT", () => {
  console.log("WebSocket server stopped...");
});

const command = (ws: WebSocket, type: string, data: string) => {
    console.log(`cmd from frontend: ${type}`, data);

    if (type === WsReceiveCommands.REG) {
        registrationService(ws, data);
    }
    if (type === WsReceiveCommands.CREATE_ROOM) {
        createRoom(ws);
    }
    if (type === WsReceiveCommands.ADD_USER_TO_ROOM) {
        addUserToRoom(ws, data);
    }
    

};