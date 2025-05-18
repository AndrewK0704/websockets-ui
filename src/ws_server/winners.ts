import { WebSocket} from "ws";
import { userDb } from "./registration";
import { WsSendCommands } from "./index";

export const updateWinners =(ws:WebSocket)=> {
    const usersWin:any=[];

    for (let i=0; i<userDb.length; i++){
        usersWin.push({name:userDb[i].name, wins:userDb[i].wins})
    }
    const data = JSON.stringify(usersWin);
    const type = WsSendCommands.UPDATE_WINNERS;
    const result = JSON.stringify({type, data, id:0});
    ws.send(result);
    console.log(`answer: ${result}`);
}