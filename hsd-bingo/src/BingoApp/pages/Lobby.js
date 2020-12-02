import React, { Component } from 'react';
import { Header, Button, Table, Input, Grid } from 'semantic-ui-react'

class ButtonToggle extends Component {
  state = {}
  handleClick = () =>
    this.setState((prevState) => ({ active: !prevState.active }))


  render() {
    const { active } = this.state

    return (
      <Button toggle active={active} onClick={this.handleClick}>
        Bereit
      </Button>
    )
  }
}

const TablePlayerLobby = () => (
  <Table unstackable celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Spieler</Table.HeaderCell>
        <Table.HeaderCell>Bereit</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell>Drack</Table.Cell>
        <Table.Cell>X</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Flo</Table.Cell>
        <Table.Cell>-</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Mario</Table.Cell>
        <Table.Cell>X</Table.Cell>
      </Table.Row>
    </Table.Body>

    <Table.Footer fullWidth>
      <Table.Row>
        <Table.HeaderCell>
          <ButtonToggle>Bereit</ButtonToggle>
        </Table.HeaderCell>
        <Table.HeaderCell />
      </Table.Row>
    </Table.Footer>
  </Table>
)

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
)

const GridHeader = () => (
  <Grid divided='vertically'>
    <Grid.Row columns={2}>
      <Grid.Column>
        <Header as='h1'>Lobby ISE</Header>
      </Grid.Column>
      <Grid.Column>
        <Button color='red' floated='right'>Leave Lobby</Button>
      </Grid.Column>
    </Grid.Row>
  </Grid>
)

class Lobby extends React.Component {
    render(){
        return (
            <div>
                <p>{GridHeader()}</p>
                <p>{GridTables()}</p>
            </div>
          );
    }
}

export default Lobby;