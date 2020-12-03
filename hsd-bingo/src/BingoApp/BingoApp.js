import React from 'react';
import { Container, Divider, Header, Icon, Button, Image } from 'semantic-ui-react';
import Start from './pages/Start'
import Lobby from './pages/Lobby'
import Game from './pages/Game'
import End from './pages/End'

import MyData from './Data'




class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          lobbies: [],
          error: false
        };

        this.loadLobbies = this.loadLobbies.bind(this);
        this.timer = this.timer.bind(this);
        setInterval(this.timer, 500);
      }
    

    async loadLobbies(){
        let lobbies = await MyData.getLobbies();
        
        if(lobbies === null){
           this.setState({error: true})
        }else{
           this.setState({lobbies: lobbies, error: false});
        }
    }

    timer(){
        this.loadLobbies();
    }

    render(){

        return (
            <Container className="BingoApp">
                <h1>Hallo!</h1>
                <Button icon='refresh' onClick={this.loadLobbies} floated='right' />
                {this.state.lobbies.map((lobby) => {
                    return <h2>{lobby.name}</h2>;
                })}
                <Divider horizontal>
                    <Header as='h4'>
                        <Icon name='arrow right' />
                        Start
                    </Header>
                </Divider>
                <Start/>
                <Divider horizontal>
                    <Header as='h4'>
                        <Icon name='wait' />
                        Lobby
                    </Header>
                </Divider>
                <Lobby/>
                <Divider horizontal>
                    <Header as='h4'>
                        <Icon name='play' />
                        Game
                    </Header>
                </Divider>
                <Game/>
                <Divider horizontal>
                    <Header as='h4'>
                        <Icon name='stop' />
                        End
                    </Header>
                </Divider>
                <End/>
            </Container>
          );
    }
}

export default App;