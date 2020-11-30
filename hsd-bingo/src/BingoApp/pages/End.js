import React from 'react';
import { Header, Button, Image, Table} from 'semantic-ui-react';
import { Hook, Console, Decode } from 'console-feed'

const Header_function = () => (
    <div>
        <Table>
            <Table.Body>
                <Table.Row>
                    <Table.Cell><Header as='h1'>HSD BINGO</Header></Table.Cell>
                    <Table.Cell><Header as='h1'>FACHL</Header></Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    </div>
  )

const Image_function = () => (
    <Image src='https://823018.smushcdn.com/1622763/wp-content/uploads/2017/06/Winner.jpg?lossy=1&strip=1&webp=1' size='large' />
  )

const Button_function = () => (
    <div>
      <Button color='teal'>
        <Header as='h2'>Lobby verlassen</Header>
      </Button>
      <Button color='teal'>
        <Header as='h2'>Spiel verlassen</Header>
      </Button>

    </div>
  )

 const Stats_function = () => (
    <div>
        <Table color={'teal'} key={'teal'} inverted>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Spielstatistik</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                <Table.Row>
                    <Table.Cell>Beste Reihe in #208 (alle Teilnehmer)</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>(Unterschiedliche) gezogene Zahlen in #208</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Meine Reihen in #208</Table.Cell>        
                </Table.Row>
            </Table.Body>
    </Table>
  </div>
)

const Image_Stats_Table = () => (
    <div>
        <Table celled>
            <Table.Body>
                <Table.Row>
                    <Table.Cell>{Image_function()}</Table.Cell>
                    <Table.Cell>{Stats_function()}</Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    </div>
)

class End extends React.Component {
    state = {
        logs: []
      }
    
    componentDidMount() {
    Hook(window.console, log => {
        this.setState(({ logs }) => ({ logs: [...logs, Decode(log)] }))
    })

    console.log('Mani@macbook:/usr/root/ISE/SexiHexi97$ check A4')
    console.log('Mani@macbook:/usr/root/ISE/SexiHexi97$ check C1')
    console.log('Mani@macbook:/usr/root/ISE/SexiHexi97$ check D2')
    console.log('Mani@macbook:/usr/root/ISE/SexiHexi97$ check D3')
    console.log('Mani@macbook:/usr/root/ISE/SexiHexi97$ leave lobby')
    }  

    render(){
        return (
            <div style={{ backgroundColor: '#242424' }}>
                <p>{Header_function()}</p>
                <p>{Image_Stats_Table()}</p>
                <p>{Button_function()}</p>
                <p><Console logs={this.state.logs} variant="dark" /></p>
            </div>
          );
    }
}
export default End;