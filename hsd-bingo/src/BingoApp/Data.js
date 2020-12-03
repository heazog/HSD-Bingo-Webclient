//import axios from 'axios';

const debug = true;

class DataBase{

  getLobbies(){ throw new Error('getLobbies not implemented!'); }
  joinLobby(lobby, username){ throw new Error('joinLobby not implemented!'); }
  getPlayers(lobby){ throw new Error('getPlayers not implemented!'); }
  getLobbyStatus(lobby){ throw new Error('getLobbyStatus not implemented!'); }
  start(userID){ throw new Error('start not implemented!'); }
  getBoard(userID){ throw new Error('getBoard not implemented!'); }
  makeSelection(userID, x, y){ throw new Error('makeSelection not implemented!'); }
  bingo(userID){ throw new Error('bingo not implemented!'); }
};


class Data extends DataBase{

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class DataDummy extends DataBase{
    async getLobbies(){  
        await sleep(2000);
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

    joinLobby(lobby, username){
        return [
            {
                "UID": 3,
                "master": true
            }
        ];
    }
    getPlayers(lobby){
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
    getLobbyStatus(lobby){
        return {
            "gametime": "34"
        };
    }
    start(userID){
        return null;
    }
    getBoard(userID){
        return [
            "wort11",
            "wort12",
            "wort13",
            "wort14",
            "wort15",
            "wort21",
            "wort22",
            "wort23",
            "wort24",
            "wort25",
            "wort31",
            "wort32",
            "wort33",
            "wort34",
            "wort35",
            "wort41",
            "wort42",
            "wort43",
            "wort44",
            "wort45",
            "wort51",
            "wort52",
            "wort53",
            "wort54",
            "wort55"
        ];
    }
    makeSelection(userID, x, y){
        return null;
    }
    bingo(userID){
        return {
            "winner": null
        }
    }
}


var MyData;
if(debug){
  MyData = new DataDummy();
}else{
  MyData = new Data();
}


export default MyData