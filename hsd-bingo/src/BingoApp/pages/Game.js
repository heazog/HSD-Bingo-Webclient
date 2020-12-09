import React from 'react';
import {Grid, Message, Button} from 'semantic-ui-react'
import data from "../Data";
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon";


//TODO: Columns vertikal centern (frag den Herzog)
const checkInterval = 1000;

const placeholderTerms = [
    [
        "wort11",
        "wort12",
        "wort13",
        "wort14",
        "wort15"
    ],
    [
        "wort21",
        "wort22",
        "wort23",
        "wort24",
        "wort25"
    ],
    [
        "wort31",
        "wort32",
        "wort33",
        "wort34",
        "wort35"
    ],
    [
        "wort41",
        "wort42",
        "wort43",
        "wort44",
        "wort45"
    ],
    [
        "wort51",
        "wort52",
        "wort53",
        "wort54",
        "wort55"
    ]
];

function Field(props) {
    return (
        <Grid.Column className="board-column" color={props.color} onClick={props.onClick}>
            {props.value}
        </Grid.Column>
    );
}

async function checkBingo(){

    let winner = await data.bingo();
    //TODO: Gewinner setzen in Struktur. Hier oder in Datenschicht?

    if(winner === data.getUser().name) {
        //Gewinnerbildschirm
    }else{
        //Verliererbildschirm
    }

}

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lobby: data.getLobby(),
            terms: placeholderTerms,
            active: [],
            currentTerm: null,
            hideCheckMessage: true
        };

        this.setTerms = this.setTerms.bind(this);
        this.setTerms().catch(
            err => console.log('Error in setTerms: ' + err),
        );

        //setInterval(function(){ this.checkBingo();}, checkInterval);

        setInterval(() => {
            checkBingo().catch(
                err => console.log('Error in checkBingo: ' + err),
            );
        }, checkInterval);

    }

    async handleClick(x,y) {
        this.setState({hideCheckMessage: false});
        this.setState({currentTerm: this.state.terms[x][y]});
        let allowed = await data.makeSelection(x,y);
        const active = this.state.active.slice();

        if(allowed === true){
            active[x][y] = true;
            this.setState({hideCheckMessage: true});
        }
        else{
            //Pop-up
            //Begriff wurde abgelehnt
        }

        this.setState({
            active : active,
        });
    }

    async setTerms(){
        let terms = await data.getBoard();

        if(terms === null){
            this.state.terms = null;
        }else{
            this.state.terms = terms;
        }
    }


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

    renderRejectMessage(){

        return (
            <Grid centered padded>
                <Grid.Column mobile={16} computer={8}>
                    <Message icon hidden={false}>
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

    render(){
        return (
            <div className="game">

                <h1 align="center" >{this.state.lobby}</h1>

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