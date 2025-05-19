import { WebSocket } from "ws";
import { RegServerResponseData} from "./model";
import { User } from "./model";
import {WsSendCommands} from './index';
import { v4 as uuidv4 } from 'uuid';
import { updateRoom } from "./rooms";
import { updateWinners } from "./winners";

export const userDb: any =[];

const isUser = (name: string, password: string) => {
    for (let i=0; i<userDb.length; i++){
        if (name===userDb[i].name && (password===userDb[i].password)){
            return true;
        }
    }
}

const incorrectPassword = (name: string, password: string) => {
    for (let i=0; i<userDb.length; i++){
        if (name===userDb[i].name && (password!==userDb[i].password)){
            return true;
        }
    }
}

const register = (name: string, password: string, ws: WebSocket) => {
    let str:string = uuidv4();
    const userNew: User={
        name,
        index: str,
        password,
        ws,
        wins:0
    }

    userDb.push(userNew);
    return userNew;
}

const login = (name: string, ws: WebSocket) => {
    for (let i=0; i<userDb.length; i++){
        if (name===userDb[i].name){
            userDb[i].ws=ws;
            return userDb[i];
        } 
    }
}

export const registrationService = (ws: WebSocket, data: string) => {
    const dataParse = JSON.parse(data);
    
    if (isUser(dataParse.name, dataParse.password)){
        const userNew=login(dataParse.name, ws);
        const type = WsSendCommands.REG;
        const obj: RegServerResponseData = {
        name: userNew.name,
        index: userNew.index.toString(),
        error: false,
        errorText: '',
        };

        const data=JSON.stringify(obj);
        const result = JSON.stringify({type, data, id:0});
        ws.send(result);
        console.log(`answer: ${result}`);
        updateRoom();
        updateWinners();
        
    } else if (incorrectPassword(dataParse.name, dataParse.password)) {
        const type = WsSendCommands.REG;
        const obj: RegServerResponseData = {
            name:dataParse.name,
            index: '',
            error: true,
            errorText: 'Error',
        };
        const data = JSON.stringify(obj);
        const result = JSON.stringify({type, data, id:0});
        ws.send(result);
        console.log(`answer: ${result}`);
        
    } else {
        const type = WsSendCommands.REG;
        const userNew=register(dataParse.name, dataParse.password, ws);
        const obj: RegServerResponseData = {
        name: userNew.name,
        index: userNew.index.toString(),
        error: false,
        errorText: '',
        };

        const data=JSON.stringify(obj);
        const result = JSON.stringify({type, data, id:0});
        ws.send(result);
        console.log(`answer: ${result}`);
        updateRoom();
        updateWinners();
    }
}; 

