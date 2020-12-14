import React, { Component } from 'react';
import { Message, Container, Header, Button, Table, Icon, Grid } from 'semantic-ui-react'
import data from '../Data'

const PlayerState = {
    Waiting: 0,
    Ready: 1,
    Playing: 2,
    Disconnected: 3
};

// sleep function used for delays
const checkInterval = 1000;

class Lobby extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lobby: "",
            name: "",
            master: false,
            ready: true,
            readyState: PlayerState.Waiting,
            players: [],
            started: false,
            error: false
        };

        this.loadPlayers = this.loadPlayers.bind(this);
        this.toggleReady = this.toggleReady.bind(this);
        this.startGame = this.startGame.bind(this);
        this.leaveLobby = this.leaveLobby.bind(this);
        this.printReady = this.printReady.bind(this);
        this.printOwnName = this.printOwnName.bind(this);
        this.renderLoadMessage = this.renderLoadMessage.bind(this);

        // call async function to check if game started
        this.checkLobbyStatusPoll = setInterval(() => {
            this.checkLobbyStatus().catch(
                err => console.log('Error in checkLobbyStatus: ' + err),
            );
        }, checkInterval);

        // call async function to load players in lobby periodically
        this.loadPlayersPoll = setInterval(() => {
            this.loadPlayers().catch(
                err => console.log('Error in loadPlayers: ' + err),
            );
        }, checkInterval);
    }

    componentDidMount(){
        this.isMouted = true;
        // call function to load own name, id and master state
        this.loadUser();
        // call function to load lobby name
        this.loadLobby();
    }

    componentWillUnmount() {
        this.isMouted = false;
    }

    // notify server that ready button was pressed
    async startGame(){
        await data.start();
    }

    async checkLobbyStatus(){
        let ret = await data.getJoinedLobbyStatus();
        //console.log("await JoinedLobbyStatus");
        if(ret.gametime > 0 && this.state.started === false && this.isMouted === true){
            // change screen to game
            // stop async functions
            clearInterval(this.checkLobbyStatusPoll);
            clearInterval(this.checkLobbyStatusPoll);
            let ret = false
            while(!ret)
            {
                // wait for gamedata
                ret = await data.requestBoard();
            }
            //change screen to game
            this.setState({started: true, error: false});
            this.props.goToPage(2)
        }
    }

    // async function to load players in lobby periodically
    async loadPlayers(){
        let players_list = await data.getPlayers();
        //console.log("await getPlayers:" + players_list);

        if(this.isMouted === true)
        {
            if(players_list === null){
                this.setState({error: true});
            }else{
                this.setState({players: players_list, error: false});
            }
        }
    }

    // load own name, id and master state
    loadUser(){
        let user = data.getUser();
        //let userID = data.getUserID();
        let master = data.getMaster();

        if(user === null){
            this.setState({error: true});
        }else{
            this.setState({name: user, master: master, error: false});
        }
    }

    // load lobby name
    loadLobby(){
        let lobby = data.getLobby();

        if(lobby === null){
            this.setState({error: true});
        }else{
            this.setState({lobby: lobby, error: false});
        }
    }

    // function called by ready button to toggle ready state and notifys server
    toggleReady() {
        this.setState({ ready: !this.state.ready });

        //console.log("ready state is" + this.state.ready);

        if(this.state.ready === true) {
            this.setState({readyState: PlayerState.Ready});
        }
        else {
            this.setState({readyState: PlayerState.Waiting});
        }

        // notify server
        this.startGame();
    }

    async leaveLobby() {
        // stop async functions
        clearInterval(this.checkLobbyStatusPoll);
        clearInterval(this.checkLobbyStatusPoll);

        await data.disconnect();
        //change screen to start
        this.props.goToPage(0);
    }


    // Grid to print crown if user is master
    GridMaster = () => (
        <Grid divided='vertically'>
            <Grid.Row columns={2}>
                <Grid.Column width={1}>
                    <Icon color="yellow" name = "chess king" />
                </Grid.Column>
                <Grid.Column>
                    {this.state.name}
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )


    printOwnName(){
        if(this.state.master === true) {
            return(
                this.GridMaster()
            )
        }else {
            return(
                this.state.name
            )
        }
    }

    printReady(state){
        switch(state) {
            case PlayerState.Waiting:
                return(
                    <Icon color="red" name = "thumbs down outline" />
                )
            case PlayerState.Ready:
                return(
                    <Icon color="green" name = "thumbs up outline" />
                )
            case PlayerState.Playing:
                return(
                    <Icon color="green" name = "play circle" />
                )
            case PlayerState.Disconnected:
                return(
                    <Icon color="black" name = "sign-out" />
                )
            default:
                return(
                    <Icon color="red" name = "wheelchair" />
                )
        }
    }

    renderLoadMessage(){
        return (
            <Grid centered padded>
                <Grid.Column mobile={16} computer={8}>
                    <Message icon hidden={!this.state.started}>
                        <Icon name='circle notched' loading />
                        <Message.Content>
                            <Message.Header>Spiel wird vorbereitet!</Message.Header>
                        </Message.Content>
                    </Message>
                </Grid.Column>
            </Grid>
        );
    }

    TablePlayerLobby = () => (
        <Table unstackable celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Spieler</Table.HeaderCell>
                    <Table.HeaderCell>Bereit</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                <Table.Row>
                    <Table.Cell>{this.printOwnName()}</Table.Cell>
                    <Table.Cell>{this.printReady(this.state.readyState)}</Table.Cell>
                </Table.Row>

                {this.state.players.map((player, index) => {
                    var status = player.status;
                    if(player.name !== this.state.name) {
                        return (
                            <Table.Row key={index}>
                                <Table.Cell>{player.name}</Table.Cell>
                                <Table.Cell>{this.printReady(status)}</Table.Cell>
                            </Table.Row>
                        )
                    }
                    else {
                        return (
                            null
                        )
                    }
                })
                }
            </Table.Body>

            <Table.Footer fullWidth>
                <Table.Row>
                    <Table.HeaderCell>
                        <Button toggle active={this.state.readyState === PlayerState.Ready} onClick={this.toggleReady}>Bereit</Button>
                    </Table.HeaderCell>
                    <Table.HeaderCell />
                </Table.Row>
            </Table.Footer>
        </Table>
    )

    GridHeader = () => (
        <Grid divided='vertically'>
            <Grid.Row columns={2}>
                <Grid.Column>
                    <Header as='h1'>{this.state.lobby}</Header>
                </Grid.Column>
                <Grid.Column>
                    <Button color='red' floated='right' circular onClick={this.leaveLobby}>Leave Lobby</Button>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )

    render(){
        return (
            <Container className="Lobby">
                {this.GridHeader()}
                {this.TablePlayerLobby()}
                {this.renderLoadMessage()}
            </Container>
        );
    }
}

export default Lobby;