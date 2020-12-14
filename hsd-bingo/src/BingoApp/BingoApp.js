import React from 'react';
import { Button, Container, Divider } from 'semantic-ui-react';
import Start from './pages/Start'
import Lobby from './pages/Lobby'
import Game from './pages/Game'
import End from './pages/End'


class App extends React.Component {

    constructor(props) {
        super(props);

        // initialize state to page 0 (Start)
        this.state = {
          page: 0
        };

        // bind setPage method to 'this' class
        this.setPage = this.setPage.bind(this);
      }
    

    setPage(num){
        // set page to num
        this.setState({page: num});
    }

    render(){
        // create page variable with content of current page
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

        // render App Cointainer with selected page
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