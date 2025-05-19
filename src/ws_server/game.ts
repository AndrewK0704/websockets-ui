import { v4 as uuidv4 } from 'uuid';
import { WsSendCommands } from "./index";
import {userDb} from './registration';

export const createGame = (room:any) => {
    try {

        const type = WsSendCommands.CREATE_GAME;
        const uuid = uuidv4();
        const game1 = {
            idGame: uuid.toString(),
            idPlayer: room[0].index
        };

        let ws1;

        for (let i=0; i<userDb.length; i++){
            if (room[0].index===userDb[i].index){
                ws1=userDb[i].ws;
            }
        }

        let data=JSON.stringify(game1);
        const result1 = JSON.stringify({type, data, id:0});
        ws1.send(result1);
        console.log(`answer: ${result1}`);

        const game2 = {
            idGame: uuid.toString(),
            idPlayer: room[1].index
        };

        let ws2;

        for (let i=0; i<userDb.length; i++){
            if (room[1].index===userDb[i].index){
                ws2=userDb[i].ws;
            }
        }

        data=JSON.stringify(game2);
        const result2 = JSON.stringify({type, data, id:0});
        ws2.send(result2);
        console.log(`answer: ${result2}`);

    } catch (error) {
      console.error(error);
    }
}