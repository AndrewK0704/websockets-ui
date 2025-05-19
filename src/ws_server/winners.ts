//import { WebSocket} from "ws";
import { userDb } from "./registration";
import { WsSendCommands } from "./index";
import { castToAllClients } from "./rooms";

export const updateWinners =()=> {
    const usersWin:any=[];

    for (let i=0; i<userDb.length; i++){
        usersWin.push({name:userDb[i].name, wins:userDb[i].wins})
    }
    const data = JSON.stringify(usersWin);
    castToAllClients(WsSendCommands.UPDATE_WINNERS, data);
    // const type = WsSendCommands.UPDATE_WINNERS;
    // const result = JSON.stringify({type, data, id:0});
    // ws.send(result);
    // console.log(`answer: ${result}`);
}