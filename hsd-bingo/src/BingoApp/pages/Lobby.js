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
            started: false
        };

        this.loadPlayers = this.loadPlayers.bind(this);
        this.toggleReady = this.toggleReady.bind(this);
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
        // set mounted flag
        this.isMouted = true;
        // call function to load own name, id and master state
        this.loadUser();
        // call function to load lobby name
        this.loadLobby();
    }

    componentWillUnmount() {
        // reset flag
        this.isMouted = false;
    }

    async checkLobbyStatus(){
        let ret = await data.getJoinedLobbyStatus();
        //console.log("await JoinedLobbyStatus");
        if(ret.gametime > 0 && this.state.started === false && this.isMouted === true){
            // set flag to print message
            this.setState({started: true});
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
            this.props.goToPage(2)
        }
    }

    // async function to load players in lobby periodically
    async loadPlayers(){
        let players_list = await data.getPlayers();
        //console.log("await getPlayers:" + players_list);

        if(this.isMouted === true)
        {
            if(players_list !== null){
                this.setState({players: players_list});
            }
        }
    }

    // load own name, id and master state
    loadUser(){
        let user = data.getUser();
        //let userID = data.getUserID();
        let master = data.getMaster();

        if(user !== null && master !== null){
            this.setState({name: user, master: master});
        }
    }

    // load lobby name
    loadLobby(){
        let lobby = data.getLobby();

        if(lobby !== null){
            this.setState({lobby: lobby});
        }
    }

    // function called by ready button to toggle ready state and notifys server
    async toggleReady() {
        this.setState({ ready: !this.state.ready });

        //console.log("ready state is" + this.state.ready);

        if(this.state.ready === true) {
            this.setState({readyState: PlayerState.Ready});
        }
        else {
            this.setState({readyState: PlayerState.Waiting});
        }

        // notify server that ready button was pressed
        await data.start();
    }

    // Disconnect from Server and switch to first page
    async leaveLobby() {
        // stop async functions
        clearInterval(this.checkLobbyStatusPoll);
        clearInterval(this.checkLobbyStatusPoll);

        await data.disconnect();
        //change screen to start
        this.props.goToPage(0);
    }

    // prints an icon acording to the state argument
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

    // returns own name in plane text or an grid with a crown
    printOwnName(){
        if(this.state.master === true) {
            return(
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
        }else {
            return(
                this.state.name
            )
        }
    }

    // renders a "Spiel wird vorbereitet!" message if the started flag is set
    renderLoadMessage(){
        return (
            <Message icon hidden={!this.state.started}>
                <Icon name='circle notched' loading />
                <Message.Content>
                    <Message.Header>Spiel wird vorbereitet!</Message.Header>
                </Message.Content>
            </Message>
        );
    }

    // returns the dynamic table of the players in the lobby
    TablePlayerLobby = () => (
        <Table className="LobbyTable" unstackable celled>
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
                        <Button className="LobbyButton" toggle active={this.state.readyState === PlayerState.Ready} onClick={this.toggleReady}>Bereit</Button>
                    </Table.HeaderCell>
                    <Table.HeaderCell />
                </Table.Row>
            </Table.Footer>
        </Table>
    )

    // returns a grid with the headers: lobbyname and leavebutton
    GridHeader = () => (
        <Grid divided='vertically'>
            <Grid.Row columns={2}>
                <Grid.Column>
                    <Header as='h1'>{this.state.lobby}</Header>
                </Grid.Column>
                <Grid.Column>
                    <Button className="LobbyButton" color='red' floated='right' circular onClick={this.leaveLobby}>Zurück</Button>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )

    // renders the lobby
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