export type RegClientResponseData = {
  name: string;
  password: string;
};

export type AddUserToRoomClientResponseData = {
  indexRoom: string;
};

export type AddShipsClientResponseData = {
  gameId: string;
  ships: Ship[];
  indexPlayer: string;
};

export type AttackClientResponseData = {
  gameId: string;
  x: number;
  y: number;
  indexPlayer: string;
};

export type RandomAttackClientResponseData = {
  gameId: string;
  indexPlayer: string;
};

/*---------------------------*/

export type GameSettings = {
  shipsField: number[][];
  ships: Ship[];
  shipHits: {
    length: number;
    hits: number;
  }[];
  sunkShipCount: number;
};

export type Game = {
  idGame: string,
  playerIds: string[];
  playerIdToGameSettings: Record<string, GameSettings>;
  currentPlayerId?: string;
};

export type AttackStatus = 'shot' | 'killed' | 'miss';

/*---------------------------*/

export type Room = {
  roomId: string;
  roomUsers: {
    name: string;
    index: string;
  }[]
}

/*---------------------------*/

export type RegServerResponseData = {
  name: string;
  index: string;
  error: boolean;
  errorText: string;
};

export type CreateGameServerResponseData = {
  idGame: string;
  idPlayer: string;
};

export type StartGameServerResponseData = {
  ships: Ship[];
  currentPlayerIndex: string;
};

export type AttackServerResponseData = {
  position: {
    x: number;
    y: number;
  };
  currentPlayer: string;
  status: AttackStatus;
};

export type FinishGameServerResponseData = {
  winPlayer: string;
};

/*---------------------------*/

type ShipSizeType = 'small' | 'medium' | 'large' | 'huge';

export type Ship = {
  position: {
    x: number;
    y: number;
  };
  direction: boolean;
  type: ShipSizeType;
  length: number;
};

/*---------------------------*/

import { WebSocket } from "ws";

export type User = {
  name: string;
  index: string | number;
  password: string;
  ws: WebSocket;
  wins: number;
};

/*---------------------------*/