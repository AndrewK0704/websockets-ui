import { WebSocket} from "ws";
import { wsServer, WsSendCommands } from "./index";
import { Room } from "./model";

let roomsDb:Room[]=[];

export const broadcastToAllClients = (type: WsSendCommands, data: string) => {
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

      broadcastToAllClients(WsSendCommands.UPDATE_ROOM, stringifyData);
    } catch (error) {
      console.error(error);
    }
}