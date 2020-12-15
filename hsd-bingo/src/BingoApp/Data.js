import axios from 'axios';

// debug == false: Data class will be used (with server connection)
// debug == true: DummyData class will be used (without server connection)
const debug = false;

// Sever address of REST-API service
const SERVER = "http://193.170.192.202:8080";

class DataBase{

    constructor(){
        // initializing member variables
        this.board = null;
        this.lobby = null;
        this.userName = null;
        this.userID = null;
        this.winnerName = null;
        this.master = null;
    }

    // wrapper for server communication
    async getLobbies(){ throw new Error('getLobbies not implemented!'); }
    async joinLobby(lobby, username){ throw new Error('joinLobby not implemented!'); }
    async getPlayers(){ throw new Error('getPlayers not implemented!'); }
    async getJoinedLobbyStatus(){ throw new Error('getLobbyStatus not implemented!'); }
    async getLobbyStatus(lobby){ throw new Error('getLobbyStatus not implemented!'); }
    async start(){ throw new Error('start not implemented!'); }
    async requestBoard(){ throw new Error('requestBoard not implemented!'); }
    async makeSelection(x, y){ throw new Error('makeSelection not implemented!'); }
    async bingo(){ throw new Error('bingo not implemented!'); }
    async highscores(){ throw new Error('highscores not implemented!'); }
    async disconnect(){ throw new Error('disconnect not implemented!'); }

    // get functions for member Variables
    getWinner(){ return this.winnerName; }
    getUser(){ return this.userName; }
    getMaster(){ return this.master; }
    getLobby(){ return this.lobby; }
    getBoard(){ return this.board; }

    // Convert LVA name from alias to Display name (e.g. from ISE7 to ISE1)
    convertLVA(lva){
        if(lva !== null){
            let semesterNo = lva.slice(-1);
            if(semesterNo >= 7){
                return lva.slice(0,-1) + (semesterNo - 6);
            }else if(semesterNo === "0"){ // Semester 10
                return lva.slice(0,-2) + 4;
            }else{
                return lva.slice(0,-1) + semesterNo;
            }
        }
    }
};



class Data extends DataBase{
    // help function for HTTP GET requests
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
    // help function for HTTP POST requests
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
    // returns /getlobbies server response
    async getLobbies(){  
        return await this.get("/getlobbies");
    }
    // returns /joinlobby server response and sets member variables
    async joinLobby(lobby, username){
        var ret = await this.post("/joinlobby", {"lobby": lobby, "name": username});
        this.lobby = lobby;
        this.userName = username;
        this.userID = ret.UID;
        this.master = ret.master;
        return ret;
    }
    // returns /getplayers server response if lobby is already set, else null
    async getPlayers(){ 
        if(!this.lobby)
            return null;
        return await this.get("/getplayers?lobby="+this.lobby);
    }
    // returns /getlobbystatus server response if lobby is already set, else null
    async getJoinedLobbyStatus(){
        if(!this.lobby)
            return null;
        return await this.get("/getlobbystatus?lobby="+this.lobby);
    }
    // returns /getlobbystatus server response of parameter 'lobby'
    async getLobbyStatus(lobby){
        return await this.get("/getlobbystatus?lobby="+lobby);
    }
    // returns /start server response if userID is already set, else null
    async start(){
        if(!this.userID)
            return null;
        await this.post("/start", {"UID": this.userID});
        return true;
    }
    // returns /getboard server response if userID is already set, else null
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
    // returns /makeselection server response if userID is already set, else null
    async makeSelection(x, y){ 
        if(!this.userID)
            return null;
        await this.post("/makeselection", {"UID": this.userID, "x": x, "y": y});
        return true;
    }
    // returns /bingo server response if userID is already set, else null
    async bingo(){ 
        if(!this.userID)
            return null;
        var ret = await this.get("/bingo?UID="+this.userID);
        this.winnerName = ret.winner;
        return ret;
    }
    // returns /highscores server response
    async highscores(){ 
        return await this.get("/highscores");
    }
    // returns /disconnect server response if lobby is already set, else null
    async disconnect(){
        if(!this.lobby)
            return null;
        console.log({"lobby": this.lobby, "uid": this.userID});
        return await this.post("/disconnect", {"lobby": this.lobby, "UID": this.userID});
    }
}


//function for simulating request time
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Class for server simulation
class DataDummy extends DataBase{

    // returns a simulated /getlobbies response (random LVAs and users)
    async getLobbies(){

        let DummyLobbie = [];

        for(let i=0;i<=20; i++){


            let LVA = {
                "name": "LVA" + (i%10+1),//(1 + Math.round(Math.random()*10)),
                "users": ((Math.round(Math.random()*3) < 2) ? Math.round(Math.random()*40) : 0)
            };

            DummyLobbie = DummyLobbie.concat(LVA)
        }

        await sleep(1000);
        return DummyLobbie;
    }

    // returns a simulated /joinlobby response and sets member variables
    async joinLobby(lobby, username){
        await sleep(1000);
        this.lobby = lobby;
        this.userName = username;
        this.userID = 3;
        this.master = true;
        return {
                "UID": 3,
                "master": true
            };
    }
    // returns a simulated /getplayers response if lobby is already set, else null
    async getPlayers(){
        if(!this.lobby)
            return null;
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
    // returns a simulated /getlobbystatus response if lobby is already set, else null
    async getJoinedLobbyStatus(){
        if(!this.lobby)
            return null;
        await sleep(1000);
        return {
            "gametime": "34"
        };
    }
    // returns a simulated /getlobbystatus response of parameter 'lobby'
    async getLobbyStatus(lobby){
        await sleep(1000);
        return {
            "gametime": "99"
        };
    }
    // returns a simulated /start response if userID is already set, else null
    async start(){
        if(!this.userID)
            return null;
        await sleep(1000);
        return true;
    }
    
    // returns a simulated /getboard response if userID is already set, else null
    async requestBoard(){
        if(!this.userID)
            return null;
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
    // returns a simulated /makeselection response if userID is already set, else null
    async makeSelection(x, y){
        if(!this.userID)
            return null;
        await sleep(1000);
        return true;
    }
    // returns a simulated /bingo response if userID is already set, else null
    async bingo(){
        if(!this.userID)
            return null;
        await sleep(1000);
        return {
            "winner": null
        }
    }
    // returns a simulated /highscores response
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
    // returns a simulated /disconnect server response if lobby is already set, else null
    async disconnect(){
        if(!this.lobby)
            return null;
        await sleep(1000);
        return true;
    }
}


var MyData;
if(debug){
    // use dummy Class if debug
    MyData = new DataDummy();
}else{
    // use Data Class if not debug
    MyData = new Data();
}


export default MyData