import React from 'react';
import { Grid } from 'semantic-ui-react'
import MyData from '../Data.js'


//TODO: Columns vertikal centern (frag den Herzog)
const checkInterval = 1000;

function Field(props) {
    return (
        <Grid.Column className="board-column" color={props.color} onClick={props.onClick}>
            {props.value}
        </Grid.Column>
    );
}

function checkBingo(){
    if(MyData.bingo() != null){
        //Gewinnername speichern
        /*if(MyData.bingo() == MyData.getUsername()) {
            //Gewinnerbildschirm
        }else{
            //Verliererbildschirm
        }*/
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            squares: MyData.getBoard(),
            fields: [],
            active: [],
            xIsNext: true,
        };

        setInterval(function(){ checkBingo(); }, checkInterval);
    }

    handleClick(x,y) {
        const active = this.state.active.slice();

        //Request senden
        if(MyData.makeSelection(12345,x,y)){
            active[x][y] = true;
        }

        this.setState({
            active : active,
        });
    }

    renderField(x,y) {
        for(let y=0; y< this.state.squares.length; y++) {
            let temp = [];
            for(let x=0; x< this.state.squares[0].length; x++) {
                temp.push(new FieldA("Test"));
            }
            this.state.fields.push(temp);
        }

        for(let y=0; y< this.state.squares.length; y++) {
            let temp = [];
            for(let x=0; x< this.state.squares[0].length; x++) {
                temp.push(false);
            }
            this.state.active.push(temp);
        }

        return (
            <Field
                value={this.state.squares[x][y]}
                onClick={() => this.handleClick(x,y)}
                color={this.state.active[x][y] ? "red": "teal"}
            />
        );
    }

    render(){
        return (
            <div className="game">
                <h1 align="center" >ISE1</h1>

                <Grid columns={5}>
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


                <div className="ui message floating">
                    <div class="ui equal width grid">
                        <div className="eight wide column">
                            <div className="game-message-container">
                                <div className="header">
                                    Neuer Begriff
                                </div>
                                <p>Machma 5 Minuten Pause</p>
                            </div>
                        </div>
                        <div className="eight wide column center aligned">
                            <div className="game-buttons-container">
                                <button className="ui button">Ablehnen</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default Game;