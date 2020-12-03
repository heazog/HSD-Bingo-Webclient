import React, { Component } from 'react';
import { Container, Header, Button, Table, Icon, Input, Grid } from 'semantic-ui-react'
import MyData from '../Data'

class Lobby extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lobby: "ISE",
      name: "",
      id: "",
      master: false,
      ready: false,
      players: [],
      error: false
    };

    this.loadPlayers = this.loadPlayers.bind(this);
    this.toggleReady = this.toggleReady.bind(this);
    this.leaveLobby = this.leaveLobby.bind(this);
    this.printReady = this.printReady.bind(this);
    this.printOwnName = this.printOwnName.bind(this);

    setInterval(this.loadPlayers(), 1000000);
    this.loadUser();
    this.loadLobby();
  }

  async loadPlayers(){
    let players = await MyData.getPlayers();
    
    if(players === null){
        this.setState({error: true})
    }else{
        this.setState({players: players, error: false});
    }
  }

  async loadUser(){
    let user = await MyData.getUser();

    if(user === null){
        this.setState({error: true})
    }else{
        this.setState({name: user.name, master: user.master, error: false});
    }
  }

  async loadLobby(){/*
    let lobby = await MyData.getLobby();

    if(lobby === null){
        this.setState({error: true})
    }else{
        this.setState({lobby: lobby, error: false});
    }*/
  }
  

  toggleReady() {
    this.setState((prevState) => ({ ready: !prevState.ready }))
  }

  leaveLobby() {

  }


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
    if(state === true) {
          return(
            <Icon color="green" name = "thumbs up outline" />
          )
    }else {
          return(
            <Icon color="red" name = "thumbs down outline" />
          )
     }
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
          <Table.Cell>{this.printReady(this.state.ready)}</Table.Cell>
        </Table.Row>

        {this.state.players.map((player) => {
          var status = player.status === "ready";
            return (
            <Table.Row>
              <Table.Cell>{player.name}</Table.Cell>
              <Table.Cell>{this.printReady(status)}</Table.Cell>
            </Table.Row>
          )
          })}
      </Table.Body>

      <Table.Footer fullWidth>
        <Table.Row>
          <Table.HeaderCell>
            <Button toggle active={this.state.ready} onClick={this.toggleReady}>Bereit</Button>
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
          <Header as='h1'>Lobby ISE</Header>
        </Grid.Column>
        <Grid.Column>
          <Button color='red' floated='right' circular onClick={this.leaveLobby}>Leave Lobby</Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )

  /*
  const TableWordsLobby = () => (
    <Table compact celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Wörterliste</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Table.Cell>Soooo</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Dirac Impuls</Table.Cell>
        </Table.Row>
      </Table.Body>

      <Table.Footer fullWidth>
        <Table.Row>
          <Table.HeaderCell>
            <Input placeholder='Wort eingeben...' />
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  )

  const GridTables = () => (
    <Grid divided='vertically'>
      <Grid.Row columns={2} only='computer'>
        <Grid.Column>
          {TablePlayerLobby()}
        </Grid.Column>
        <Grid.Column>
        {TableWordsLobby()}
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={1} only='tablet mobile'>
        <Grid.Column>
        {TablePlayerLobby()}
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={1} only='tablet mobile'>
        <Grid.Column>
        {TableWordsLobby()}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )*/

  render(){
      return (
          <Container className="Lobby">
              {this.GridHeader()}
              {this.TablePlayerLobby()}
          </Container>
        );
  }
}

export default Lobby;