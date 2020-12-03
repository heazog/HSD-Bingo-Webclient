import React from 'react';
import { Grid } from 'semantic-ui-react'
import MyData from '../Data.js'


//TODO: Columns vertikal centern (frag den Herzog)


function Field(props) {
    return (
        <Grid.Column className="board-column" onClick={props.onClick}>
            {props.value}
        </Grid.Column>
    );
}

class FieldA extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: props.text,
            active: true,
            x:props.x,
            y:props.y,
        };
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);

        const fields = 1;

        this.state = {
            squares: MyData.getBoard(),
            fields: fields,
            xIsNext: true,
        };
    }

    handleClick(i) {
        const squares = this.state.squares.slice();

        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: "squares",
            xIsNext: !this.state.xIsNext,
        });
    }

    renderField(i) {
        return (
            <Field
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }


    render(){
        return (
            <div className="game">
                <h1 align="center" >ISE1</h1>

                <Grid columns='equal' columns={5}>

                    {this.renderField(0)}
                    {this.renderField(1)}
                    {this.renderField(2)}
                    {this.renderField(3)}
                    {this.renderField(4)}
                    {this.renderField(5)}
                    {this.renderField(6)}
                    {this.renderField(7)}
                    {this.renderField(8)}
                    {this.renderField(9)}
                    {this.renderField(10)}
                    {this.renderField(11)}
                    {this.renderField(12)}
                    {this.renderField(13)}
                    {this.renderField(14)}
                    {this.renderField(15)}
                    {this.renderField(16)}
                    {this.renderField(17)}
                    {this.renderField(18)}
                    {this.renderField(19)}
                    {this.renderField(20)}
                    {this.renderField(21)}
                    {this.renderField(22)}
                    {this.renderField(23)}
                    {this.renderField(24)}


                </Grid>


                <div className="ui message floating">
                    <div class="ui equal width grid">
                        <div className="eight wide column">
                            <div className="game-message-container">
                                <div className="header">
                                    Neuer Begriff
                                </div>
                                <p>Minuten Pause</p>
                            </div>
                        </div>
                        <div className="eight wide column center aligned">
                            <div className="game-buttons-container">
                                <button className="ui button game-button">Schließen</button>
                                <button className="ui button game-button">Ablehnen</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default Game;