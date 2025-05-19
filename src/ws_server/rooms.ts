import { WebSocket} from "ws";
import { wsServer, WsSendCommands } from "./index";
import { Room, AddUserToRoomClientResponseData} from "./model";
import { v4 as uuidv4 } from 'uuid';
import {userDb} from './registration';

let roomsDb:Room[]=[];

export const castToAllClients = (type: WsSendCommands, data: string) => {
    let result:any='';
    wsServer.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            result = JSON.stringify({type, data, id:0})
            client.send(result);
        }
    });
    console.log(`answer: ${result}`);
};

export const updateRoom = () => {
    try {
      const filteredRooms = roomsDb.filter(room => room.roomUsers.length < 2);
      const stringifyData = JSON.stringify(filteredRooms);

      castToAllClients(WsSendCommands.UPDATE_ROOM, stringifyData);
    } catch (error) {
      console.error(error);
    }
}

export const createRoom = (ws:WebSocket) => {
    try {
      for (let i=0; i<userDb.length; i++){
        if (ws===userDb[i].ws){
          const uuid = uuidv4();
          const room = {
            roomId: uuid.toString(),
            roomUsers: [
              {
                name: userDb[i].name,
                index: userDb[i].index
              }
            ],
          };
          roomsDb.push(room);   
        }
      }
      updateRoom();

    } catch (error) {
      console.error(error);
    }
}

export const addUserToRoom = (ws: WebSocket, data: string) => {
    try {
      const { indexRoom }: AddUserToRoomClientResponseData = JSON.parse(data);
      for (let i=0; i<userDb.length; i++){
        if (ws===userDb[i].ws){
          for(let j=0; j<roomsDb.length; j++){
            if(roomsDb[j]?.roomId.toString()===indexRoom.toString() && roomsDb[j]?.roomUsers[0]?.name!==userDb[i].name){
              roomsDb[j]?.roomUsers.push({name:userDb[i].name,index:userDb[i].index});
              console.log(roomsDb[0]?.roomUsers);
              updateRoom();
            }
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  }