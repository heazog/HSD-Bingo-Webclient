//import axios from 'axios';

const debug = true;

class DataBase{
    async getLobbies(){ throw new Error('getLobbies not implemented!'); }
    async joinLobby(lobby, username){ throw new Error('joinLobby not implemented!'); }
    async getPlayers(lobby){ throw new Error('getPlayers not implemented!'); }
    async getLobbyStatus(lobby){ throw new Error('getLobbyStatus not implemented!'); }
    async start(userID){ throw new Error('start not implemented!'); }
    async getBoard(userID){ throw new Error('getBoard not implemented!'); }
    async makeSelection(userID, x, y){ throw new Error('makeSelection not implemented!'); }
    async bingo(userID){ throw new Error('bingo not implemented!'); }
    getWinner(){ throw new Error('bingo not implemented!'); }
    getUser(){ throw new Error('bingo not implemented!'); }
};


class Data extends DataBase{
    constructor(){
        this.winner = "";
        this.user = "";
    }
    
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class DataDummy extends DataBase{
    async getLobbies(){  
        await sleep(1000);
        return [
            {
                "name": "LVA"+Math.round(Math.random()*10).toString(),
                "users": 7
            },
            {
                "name": "LVA"+Math.round(Math.random()*10).toString(),
                "users": 2
            }
        ];
    }

    async joinLobby(lobby, username){
        await sleep(1000);
        return [
            {
                "UID": 3,
                "master": true
            }
        ];
    }
    async getPlayers(lobby){
        await sleep(1000);
        return [
            {
                "name": "Player1",
                "score": "3",
                "status": "ready"
            },
            {
                "name": "Player2",
                "score": "5",
                "status": "waiting"
            }
        ];
    }
    async getLobbyStatus(lobby){
        await sleep(1000);
        return {
            "gametime": "34"
        };
    }
    async start(userID){
        await sleep(1000);
        return null;
    }
    async getBoard(userID){
        await sleep(1000);
        return [
            [
                "wort11",
                "wort12",
                "wort13",
                "wort14",
                "wort15"
            ],
            [
                "wort21",
                "wort22",
                "wort23",
                "wort24",
                "wort25"
            ],
            [
                "wort31",
                "wort32",
                "wort33",
                "wort34",
                "wort35"
            ],
            [
                "wort41",
                "wort42",
                "wort43",
                "wort44",
                "wort45"
            ],
            [
                "wort51",
                "wort52",
                "wort53",
                "wort54",
                "wort55"
            ]
        ];
    }
    async makeSelection(userID, x, y){
        await sleep(1000);
        return null;
    }
    async bingo(userID){
        await sleep(1000);
        return {
            "winner": null
        }
    }

    getWinner(){
        return "Max";
    }

    getUser(){
        return {
            name: "Ich", 
            id: 3, 
            master: false
        };
    }

}


var MyData;
if(debug){
  MyData = new DataDummy();
}else{
  MyData = new Data();
}


export default MyData