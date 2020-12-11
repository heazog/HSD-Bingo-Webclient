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

        this.setUsername = this.setUsername.bind(this);
        this.setLobby = this.setLobby.bind(this);
        this.enterLobby = this.enterLobby.bind(this);
        this.getLobbies = this.getLobbies.bind(this);

    }

    //Is called, when every UI-Element is mounted
    componentDidMount(){
        this.getLobbies().catch(err => console.log('Error in getLobbies: ' + err),);
    }

    //Setter for the username of the current player
    setUsername(event){
        this.setState({username: event.target.value});
    }

    //Setter for the name of the choosen Lobby
    setLobby(alias){
        this.setState({checkedLobby: alias});
    }

    //Get every available lobby from the server, convert the data and save it
    async getLobbies(){
        let lobbies = await data.getLobbies();

        if(lobbies === null){
            this.setState({lobbies: null})
        }else{
            lobbies.forEach( l => {
                //Convert data structure to HSD/ESD semester and group them
                let semesterNo = l.name.slice(-1);
                let LVA = {
                    alias: l.name,
                    name: "",
                    users:l.users
                };

                //Convert LVA name from alias to Display name (e.g. from ISE7 to ISE1)
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

    //Function to get to the next Page (Lobby)
    async enterLobby(){
        //Checks if all data is filled in
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
                //Waitingmessage
            }else{
                if(result.UID === 0){
                    //Username alrady taken, message to choose another
                    this.setState({message: "Username bereits vergeben"});
                    this.setState({hideCheckMessage: false});
                }else {
                    //Display next screen (Lobby), Username and ID are saved by the Datalayer
                    this.setState({hideCheckMessage: true});
                    this.props.goToPage(1);
                }
            }
        }
    }

    //Render single LVA name plus playercount
    renderSingleLVA(lva, index){
        if(lva.users === 0){
            return(
                <Button key={index}
                    onClick={() => this.setLobby(lva.alias)}
                    color='teal'
                    style={{marginBottom: 0.25 + "em"}}>
                    {lva.name}
                </Button>
            )
        }
        else{
            return(
                <Button key={index}
                        as='div'
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

    //Render a single Semester with Header
    renderSemester(sem, index){
        if(sem.name !== "") {
            return (
                <Grid key = {index} centered padded>
                    <Header as='h3' style={{marginTop: 0.5 + "em", marginBottom: 0}}>
                        {sem.name}
                    </Header>
                    <Grid.Row>
                        {sem.Lvas.map((lva, index) => (
                            this.renderSingleLVA(lva, index)
                        ))}
                    </Grid.Row>
                </Grid>
            )
        }
    }

    //Render all Semesters
    renderSemesters(){
        return(
            <Grid.Row>
                {this.state.lobbies.map((sem, index) => (
                    this.renderSemester(sem, index)
                ))}
            </Grid.Row>

        )
    }

    //Render the Checking Name an LVA message
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

    //Render whole page
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