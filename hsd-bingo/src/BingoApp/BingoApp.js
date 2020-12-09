import React from 'react';
import { Button, Container, Divider } from 'semantic-ui-react';
import Start from './pages/Start'
import Lobby from './pages/Lobby'
import Game from './pages/Game'
import End from './pages/End'


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          page: 0,
          error: false
        };

        this.setPage = this.setPage.bind(this);
      }
    

    setPage(num){
        this.setState({page: num});
    }

    render(){
        var page = null;
        switch(this.state.page){
            case 0: 
                page = <Start goToPage={this.setPage} />;
                break;
            case 1: 
                page = <Lobby goToPage={this.setPage} />;
                break;
            case 2: 
                page = <Game goToPage={this.setPage} />;
                break;
            case 3: 
                page = <End goToPage={this.setPage} />;
                break;
            default:
                page = <h1>ERROR</h1>;
                break;
        }

        // IHR BENÖTIGT ZUM NAVIGIEREN:
        // this.props.goToPage(SEITE)
        // z.B.:
        // <Button onClick={() => this.props.goToPage(1)}>next</Button>

        return (
            <Container className="BingoApp">
                <Button onClick={() => this.setPage(0)}>0</Button>
                <Button onClick={() => this.setPage(1)}>1</Button>
                <Button onClick={() => this.setPage(2)}>2</Button>
                <Button onClick={() => this.setPage(3)}>3</Button>
                <Divider horizontal>Game</Divider>
                <br/>
                {page}                
            </Container>
          );
    }
}

export default App;