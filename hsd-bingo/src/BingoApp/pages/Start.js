import React from 'react';
import { Button, Header, Input, Grid, Label, Message } from 'semantic-ui-react';
import data from "../Data";

//TODO: Absturz bei LVA10

const dummyLobbies = [
    {
        "alias": "",
        "name": "",
        "Lvas": []
    },
    {
        "alias": "",
        "name": "",
        "Lvas": []
    },
    {
        "alias": "",
        "name": "",
        "Lvas": []
    },
    {
        "alias": "",
        "name": "",
        "Lvas": []
    },
    {
        "alias": "",
        "name": "",
        "Lvas": []
    },
    {
        "alias": "",
        "name": "",
        "Lvas": []
    },
    {
        "alias": "",
        "name": "",
        "Lvas": []
    },
    {
        "alias": "",
        "name": "",
        "Lvas": []
    },
    {
        "alias": "",
        "name": "",
        "Lvas": []
    },
    {
        "alias": "",
        "name": "",
        "Lvas": []
    },
    {
        "alias": "",
        "name": "",
        "Lvas": []
    }
];

class Start extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            lobbies: dummyLobbies,
            checkedLobby: "",
            username: "",
            hideCheckMessage: true,
            message: "Username wird geprüft",
        };

        this.getLobbies = this.getLobbies.bind(this);
        this.setUsername = this.setUsername.bind(this);
        this.setLobby = this.setLobby.bind(this);
        this.enterLobby = this.enterLobby.bind(this);
        this.getLobbies().catch(err => console.log('Error in getLobbies: ' + err),);
    }

    setUsername(event){
        this.setState({username: event.target.value});
    }

    setLobby(alias){
        this.setState({checkedLobby: alias});
    }

    async enterLobby(){

        if(this.state.checkedLobby === ""){
            this.setState({message: "Bitte LVA auswählen"});
            this.setState({hideCheckMessage: false});
        }
        else if(this.state.username === ""){
            this.setState({message: "Username eingeben"});
            this.setState({hideCheckMessage: false});
        }else{
            this.setState({message: "Username wird geprüft"});
            this.setState({hideCheckMessage: false});

            let result = await data.joinLobby(this.state.checkedLobby,this.state.username);

            if(result === null){
                //Wartezeichen
            }else{
                if(result[0].UID === 0){
                    //Neuen Namen wählen
                    this.setState({message: "Username bereits vergeben"});
                    this.setState({hideCheckMessage: false});
                }else {
                    this.setState({hideCheckMessage: true});
                    //Nächster screen, username + ID werden von Datenschicht weitergereicht
                }
            }
        }
    }

    async getLobbies(){
        let lobbies = await data.getLobbies();

        if(lobbies === null){
            this.setState({lobbies: null})
        }else{
            lobbies.forEach( l => {
                //Convert Datastructure to HSD and ESD semester
                let semesterNo = l.name.slice(-1);
                let LVA = {
                    alias: l.name,
                    name: "",
                    users:l.users
                };

                if(semesterNo >= 7){
                    dummyLobbies[semesterNo - 1].name = "ESD Semester " + (semesterNo - 6);
                    LVA.name = l.name.slice(0,-1) + (semesterNo - 6);
                }else if(semesterNo === 0){
                    semesterNo = 1;
                    dummyLobbies[0].name = "ESD Semester 10";
                }else{
                    dummyLobbies[semesterNo - 1].name = "HSD Semester " + semesterNo;
                    LVA.name = l.name.slice(0,-1) + semesterNo;
                }

                dummyLobbies[semesterNo - 1].Lvas = dummyLobbies[semesterNo - 1].Lvas.concat(LVA);
            });

            this.setState({lobbies: dummyLobbies});
        }
    }

    renderSingleLVA(lva){
        if(lva.users === 0){
            return(
                <Button
                    onClick={() => this.setLobby(lva.alias)}
                    color='teal'
                    style={{marginBottom: 0.25 + "em"}}>
                    {lva.name}
                </Button>
            )
        }
        else{
            return(
                <Button as='div'
                        labelPosition='right'
                        onClick={() => this.setLobby(lva.alias)}
                        style={{marginBottom: 0.25 + "em"}}>
                    <Button color='teal'>
                        {lva.name}
                    </Button>
                    <Label as='a' basic color='teal'>
                        {lva.users}
                    </Label>
                </Button>
            )
        }

    }

    renderLobbies(sem){
        if(sem.name !== "") {
            return (
                <Grid centered padded>
                    <Header as='h3' style={{marginTop: 0.5 + "em", marginBottom: 0}}>
                        {sem.name}
                    </Header>
                    <Grid.Row>
                        {sem.Lvas.map((lva) => (
                            this.renderSingleLVA(lva)
                        ))}
                    </Grid.Row>
                </Grid>
            )
        }
    }

    renderSemesters(){
        return(
            <Grid.Row>
                {this.state.lobbies.map((sem) => (
                    this.renderLobbies(sem)
                ))}
            </Grid.Row>

        )
    }

    renderCheckMessage(){
        return (
            <Grid centered padded>
                <Grid.Column mobile={16} computer={8}>
                    <Message icon hidden={this.state.hideCheckMessage}>
                        <Message.Content>
                            {this.state.message}
                        </Message.Content>
                    </Message>
                </Grid.Column>
            </Grid>
        );
    }

    render(){
        return (
            <div className="Start">
                <h1 align="center" >HSD - BINGO!</h1>
                {this.renderCheckMessage()}
                <Input  align="center" onChange={this.setUsername} focus placeholder='Benutzername' />
                <Button color='red' floated='right' onClick={this.enterLobby} circular >Absenden</Button>
                {this.renderSemesters()}
            </div>
        );
    }
}

export default Start;