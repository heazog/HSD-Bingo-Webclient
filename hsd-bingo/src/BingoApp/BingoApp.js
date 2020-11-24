import React from 'react';
import { Container, Divider, Header, Icon } from 'semantic-ui-react';
import Start from './pages/Start'
import Lobby from './pages/Lobby'
import Game from './pages/Game'
import End from './pages/End'

class App extends React.Component {
    render(){
        return (
            <Container className="BingoApp">
                <h1>Hallo!</h1>
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