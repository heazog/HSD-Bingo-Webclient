import React, { Component } from 'react';
import { Header, Button, Table, Input } from 'semantic-ui-react'

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
  <Table compact celled>
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
        <Table.HeaderCell />
        <Table.HeaderCell>
          <ButtonToggle>Bereit</ButtonToggle>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  </Table>
)

const InputWord = () => <Input placeholder='Wort eingeben...' />

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
          <div>{InputWord()}</div>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  </Table>
)

class Lobby extends React.Component {
    render(){
        return (
            <div>
                <p><Header as='h1'>Lobby ISE</Header></p>
                <p>{TablePlayerLobby()}</p>
                <p>{TableWordsLobby()}</p>
            </div>
          );
    }
}

export default Lobby;