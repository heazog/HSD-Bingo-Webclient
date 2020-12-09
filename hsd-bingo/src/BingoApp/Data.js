import axios from 'axios';

const debug = true;
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
    async getLobbyStatus(lobby){ throw new Error('getLobbyStatus not implemented!'); }
    async start(){ throw new Error('start not implemented!'); }
    async updateBoard(){ throw new Error('updateBoard not implemented!'); }
    async makeSelection(x, y){ throw new Error('makeSelection not implemented!'); }
    async bingo(){ throw new Error('bingo not implemented!'); }
    getWinner(){ return this.winnerName; }
    getUser(){ return this.userName; }
    getLobby(){ return this.lobby; }
    getBoard(){ 
        //return this.board; 
        return [
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
        return await this.post("/getplayers", {"lobby": this.lobby});
    }
    async getJoinedLobbyStatus(){
        if(!this.lobby)
            return null;
        return await this.post("/getlobbystatus", {"lobby": this.lobby});
    }
    async getLobbyStatus(lobby){
        return await this.post("/getlobbystatus", {"lobby": lobby});
    }
    async start(){
        if(!this.userID)
            return null;
        await this.post("/start", {"UID": this.userID});
        return true;
    }
    async updateBoard(){ 
        if(!this.userID)
            return null;
        this.board = await this.post("/getboard", {"UID": this.userID});
        return true;
    }
    async makeSelection(x, y){ 
        if(!this.userID)
            return null;
        await this.post("/makeselection", {"UID": this.userID, "x": x, "y": y});
        return true;
    }
    async bingo(){ 
        if(!this.userID)
            return null;
        var ret = await this.post("/bingo", {"UID": this.userID});
        this.winnerName = ret.winner;
        return ret;
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
    async getLobbyStatus(lobby){
        await sleep(1000);
        return {
            "gametime": "99"
        };
    }
    async start(){
        await sleep(1000);
        return true;
    }

    async updateBoard(){
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
}


var MyData;
if(debug){
  MyData = new DataDummy();
}else{
  MyData = new Data();
}


export default MyData