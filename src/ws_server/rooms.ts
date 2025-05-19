import { WebSocket} from "ws";
import { wsServer, WsSendCommands } from "./index";
import { Room } from "./model";
import { v4 as uuidv4 } from 'uuid';
import {userDb} from './registration';
//import {WsReceiveCommands} from './index';

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
      
      
      // const user = usersRepository.getUserByField('ws', ws);
      // roomsRepository.createRoom(user);
      // roomsService.updateRoom();
    } catch (error) {
      console.error(error);
    }
}