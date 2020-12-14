import axios from 'axios';

const debug = false;
const SERVER = "http://193.170.192.202:8080";

class DataBase{

    constructor(){
        this.board = null;
        this.lobby = null;
        this.userName = null;
        this.userID = null;
        this.winnerName = null;
        this.master = null;
    }


    async getLobbies(){ throw new Error('getLobbies not implemented!'); }
    async joinLobby(lobby, username){ throw new Error('joinLobby not implemented!'); }
    async getPlayers(){ throw new Error('getPlayers not implemented!'); }
    async getJoinedLobbyStatus(){ throw new Error('getLobbyStatus not implemented!'); }
    async getLobbyStatus(){ throw new Error('getLobbyStatus not implemented!'); }
    async start(){ throw new Error('start not implemented!'); }
    async requestBoard(){ throw new Error('requestBoard not implemented!'); }
    async makeSelection(x, y){ throw new Error('makeSelection not implemented!'); }
    async bingo(){ throw new Error('bingo not implemented!'); }
    async highscores(){ throw new Error('highscores not implemented!'); }
    async disconnect(){ throw new Error('disconnect not implemented!'); }
    getWinner(){ return this.winnerName; }
    getUser(){ return this.userName; }
    getMaster(){ return this.master; }
    getLobby(){ return this.lobby; }
    getBoard(){ 
        return this.board;
        /*return [
            [
                "Ähm",
                "Also",
                "Any questions?",
                "Äquivalentes Basisband",
                "AWGN"
            ],
            [
                "Bandbreite",
                "Bandbreiteneffizienz",
                "Basisband",
                "Betrag+Phase",
                "Bodediagramm"
            ],
            [
                "Mach ma mal weiter",
                "Matched Filter",
                "Mättlab",
                "Mobilfunk",
                "Multiplikativer Faktor"
            ],
            [
                "Nachrichtentechnik",
                "Nebenfrequenzen",
                "Normalisiert",
                "Nutzsignal",
                "Nyquist/ -kriterium / -theorem"
            ],
            [
                "Schuldigung",
                "Sendeimpuls",
                "So/Soo",
                "Spektrum",
                "Symbolperiode"
            ]
        ];*/
    }
};


class Data extends DataBase{
    async get(path){
        var data = [];
        await axios.get(SERVER + path)
          .then(function (response) {
            data = response.data;  
          })
          .catch(function (error) {
            // handle error
          });
        return data;
    }
    async post(path, postData){
        var data = [];
        await axios.post(SERVER + path, postData)
          .then(function (response) {
            data = response.data;  
          })
          .catch(function (error) {
            // handle error
          });
        return data;
    }
    async getLobbies(){  
        return await this.get("/getlobbies");
    }
    async joinLobby(lobby, username){
        var ret = await this.post("/joinlobby", {"lobby": lobby, "name": username});
        this.lobby = lobby;
        this.userName = username;
        this.userID = ret.UID;
        this.master = ret.master;
        return ret;
    }
    async getPlayers(){ 
        if(!this.lobby)
            return null;
        return await this.get("/getplayers?lobby="+this.lobby);
    }
    async getJoinedLobbyStatus(){
        if(!this.lobby)
            return null;
        return await this.get("/getlobbystatus?lobby="+this.lobby);
    }
    async getLobbyStatus(lobby){
        return await this.get("/getlobbystatus?lobby="+lobby);
    }
    async start(){
        if(!this.userID)
            return null;
        await this.post("/start", {"UID": this.userID});
        return true;
    }
    async requestBoard(){ 
        if(!this.userID)
            return null;
        var board = await this.get("/getboard?UID="+this.userID);
        if(board.length < 25)
            return null;
        console.log(board);
        this.board = [
            board.slice(0, 5),
            board.slice(5, 10),
            board.slice(10, 15),
            board.slice(15, 20),
            board.slice(20, 25)
        ];
        console.log(this.board);
        return true;
    }
    async makeSelection(x, y){ 
        if(!this.userID)
            return null;
        await this.post("/makeselection", {"UID": this.userID, "x": x, "y": y});
        return true;
    }
    async bingo(){ 
        if(!this.lobby)
            return null;
        var ret = await this.get("/bingo?lobby="+this.lobby);
        this.winnerName = ret.winner;
        return ret;
    }
    async highscores(){ 
        return await this.get("/highscores");
    }
    async disconnect(){
        if(!this.lobby)
            return null;
        console.log({"lobby": this.lobby, "uid": this.userID});
        var ret = await this.post("/disconnect", {"lobby": this.lobby, "UID": this.userID});
        return ret;
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class DataDummy extends DataBase{
    async getLobbies(){

        let DummyLobbie = [];

        for(let i=0;i<15; i++){

            let LVA = {
                "name": "LVA" + (1 + Math.round(Math.random()*8)),
                "users": ((Math.round(Math.random()*3) < 2) ? Math.round(Math.random()*40) : 0)
            };

            DummyLobbie = DummyLobbie.concat(LVA)
        }

        await sleep(1000);
        return DummyLobbie;
    }

    async joinLobby(lobby, username){
        await sleep(1000);
        this.lobby = lobby;
        this.userName = username;
        this.userID = 3;
        this.master = true;
        return [
            {
                "UID": 3,
                "master": true
            }
        ];
    }
    async getPlayers(){
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
    async getJoinedLobbyStatus(){
        await sleep(1000);
        return {
            "gametime": "34"
        };
    }
    async getLobbyStatus(){
        await sleep(1000);
        return {
            "gametime": "99"
        };
    }
    async start(){
        await sleep(1000);
        return true;
    }

    async requestBoard(){
        await sleep(1000);
        this.board = [
            [
                "Ähm",
                "Also",
                "Any questions?",
                "Äquivalentes Basisband",
                "AWGN"
            ],
            [
                "Bandbreite",
                "Bandbreiteneffizienz",
                "Basisband",
                "Betrag+Phase",
                "Bodediagramm"
            ],
            [
                "Mach ma mal weiter",
                "Matched Filter",
                "Mättlab",
                "Mobilfunk",
                "Multiplikativer Faktor"
            ],
            [
                "Nachrichtentechnik",
                "Nebenfrequenzen",
                "Normalisiert",
                "Nutzsignal",
                "Nyquist/ -kriterium / -theorem"
            ],
            [
                "Schuldigung",
                "Sendeimpuls",
                "So/Soo",
                "Spektrum",
                "Symbolperiode"
            ]
        ];
        return true;
    }
    async makeSelection(x, y){
        await sleep(1000);
        return true;
    }
    async bingo(){
        await sleep(1000);
        return {
            "winner": null
        }
    }
    async highscores(){
        await sleep(1000);
        return { 
            "bestPlayers": [
                {"Name": "Spieler 1", "Score": 5}, 
                {"Name": "Spieler 2", "Score": 10}
            ],
            "quickestLobbies": [
                {"lobby": "ISE7", "gametime": 100},
                {"lobby": "ISE7", "gametime": 100}
            ]
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