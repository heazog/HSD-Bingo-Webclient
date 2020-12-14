import React from 'react';
import {Grid, Message, Button, Header} from 'semantic-ui-react'
import data from "../Data";
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon";


const checkInterval = 1000;


//HTML of single Field
function Field(props) {
    return (
        <Grid.Column className="board-column" color={props.color} onClick={props.onClick}>
            {props.value}
        </Grid.Column>
    );
}


class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lobby: data.getLobby(),//Erst dummy schreiben
            terms: data.getBoard(),
            active: [],
            currentTerm: null,
            hideCheckMessage: true,
            hideRejectMessage: true
        };

        this.leaveGame = this.leaveGame.bind(this);

        setInterval(() => {
            this.checkBingo().catch(
                err => console.log('Error in checkBingo: ' + err),
            );
        }, checkInterval);

    }

    //Check if somebody has won the game
    async checkBingo(){
        let winner = await data.bingo();

        //If there is a winner, call Page 4
        if(winner !== null){
            if(winner.winner !== null){
                await data.disconnect();
                console.log("Bingo");
                clearInterval(this.checkBingo());
                this.props.goToPage(3);
            }
        }
    }

    //Check clicked Term
    async handleClick(x,y) {
        console.log(x,y);
        this.setState({hideCheckMessage: false});
        this.setState({currentTerm: this.state.terms[x][y]});
        let allowed = await data.makeSelection(x,y);
        const active = this.state.active.slice();

        if(allowed === true){
            active[x][y] = true;
            this.setState({hideCheckMessage: true});
        }
        else{
            //Pop-up: Term was rejected
        }

        this.setState({
            active : active,
        });
    }

    //Leave the game towards Startscreen
    async leaveGame() {
        //change screen to start
        await data.disconnect();
        this.props.goToPage(0);
    }

    //Render a Single Field and initialize Array of clicked items
    renderField(x,y) {

        for(let y=0; y< this.state.terms.length; y++) {
            let temp = [];
            for(let x=0; x< this.state.terms[0].length; x++) {
                temp.push(false);
            }
            this.state.active.push(temp);
        }

        return (
            <Field
                value={this.state.terms[x][y]}
                onClick={() => this.handleClick(x,y)}
                color={this.state.active[x][y] ? "red": "teal"}
            />
        );
    }

    //Render the checking clicked field message
    renderCheckMessage(){
        return (
            <Grid centered padded>
                <Grid.Column mobile={16} computer={8}>
                    <Message icon hidden={this.state.hideCheckMessage}>
                        <Icon name='circle notched' loading />
                        <Message.Content>
                            <Message.Header>Begriff wird geprüft</Message.Header>
                            {this.state.currentTerm}
                        </Message.Content>
                    </Message>
                </Grid.Column>
            </Grid>
        );
    }

    //Render the term reject message for future usecases
    renderRejectMessage(){
        return (
            <Grid centered padded>
                <Grid.Column mobile={16} computer={8}>
                    <Message icon hidden={this.state.hideRejectMessage}>
                        <Message.Content>
                            <Message.Header>Neuer Begriff</Message.Header>
                            Machma mal 5 Minuten Pause bitte
                        </Message.Content>
                        <Button style={{ marginLeft: '0.25em' }}>Ablehnen</Button>
                    </Message>
                </Grid.Column>
            </Grid>
        );
    }

    GridHeader = () => (
        <Grid divided='vertically'>
            <Grid.Row columns={2}>
                <Grid.Column>
                    <Header as='h1'>{this.state.lobby}</Header>
                </Grid.Column>
                <Grid.Column>
                    <Button color='red' floated='right' circular onClick={this.leaveGame}>Leave Game</Button>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );

    //Render whole page
    render(){
        return (
            <div className="game">

                {this.GridHeader()}

                <Grid columns={5} padded>
                    {this.renderField(0,0)}
                    {this.renderField(1,0)}
                    {this.renderField(2,0)}
                    {this.renderField(3,0)}
                    {this.renderField(4,0)}
                    {this.renderField(0,1)}
                    {this.renderField(1,1)}
                    {this.renderField(2,1)}
                    {this.renderField(3,1)}
                    {this.renderField(4,1)}
                    {this.renderField(0,2)}
                    {this.renderField(1,2)}
                    {this.renderField(2,2)}
                    {this.renderField(3,2)}
                    {this.renderField(4,2)}
                    {this.renderField(0,3)}
                    {this.renderField(1,3)}
                    {this.renderField(2,3)}
                    {this.renderField(3,3)}
                    {this.renderField(4,3)}
                    {this.renderField(0,4)}
                    {this.renderField(1,4)}
                    {this.renderField(2,4)}
                    {this.renderField(3,4)}
                    {this.renderField(4,4)}
                </Grid>

                {this.renderCheckMessage()}

                {this.renderRejectMessage()}

            </div>
        );
    }
}


export default Game;