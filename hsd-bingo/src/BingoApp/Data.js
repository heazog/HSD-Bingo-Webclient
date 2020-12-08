import axios from 'axios';

const debug = true;
const SERVER = "http://193.170.192.202:8080";

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
        super();
        this.winner = "";
        this.user = "";
    }
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
        return await this.post("/joinlobby", {"lobby": lobby, "name": username});
    }
    async getPlayers(lobby){ 
        return await this.post("/joinlobby", {"lobby": lobby});
    }
    async getLobbyStatus(lobby){ throw new Error('getLobbyStatus not implemented!'); }
    async start(userID){ throw new Error('start not implemented!'); }
    async getBoard(userID){ throw new Error('getBoard not implemented!'); }
    async makeSelection(userID, x, y){ throw new Error('makeSelection not implemented!'); }
    async bingo(userID){ throw new Error('bingo not implemented!'); }
    getWinner(){ throw new Error('bingo not implemented!'); }
    getUser(){ throw new Error('bingo not implemented!'); }

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class DataDummy extends DataBase{
    async getLobbies(){

        let DummyLobbie = [];

        for(let i=0;i<12; i++){

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
        return [
            {
                "UID": 0,
                "master": true
            }
        ];
    }
    async getPlayers(){
        //lobby
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
    async getLobbyStatus(){
        //lobby
        await sleep(1000);
        return {
            "gametime": "34"
        };
    }
    async start(){
        //userID
        await sleep(1000);
        return null;
    }
    async getBoard(){
        //userID
        await sleep(1000);
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
    async makeSelection(x, y){
        //userID
        await sleep(1000);
        return true;
    }
    async bingo(){
        //userID
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
            master: true
        };
    }

    getLobby(){
        return "ISE1";
    }

}


var MyData;
if(debug){
  MyData = new DataDummy();
}else{
  MyData = new Data();
}


export default MyData