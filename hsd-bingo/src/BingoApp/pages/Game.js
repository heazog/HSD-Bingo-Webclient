import React from 'react';

//TODO: Messagebutton Padding oben/unter verkleinern
//TODO: Columns vertikal centern (frag den Herzog)

class Game extends React.Component {
    render(){
        return (
            <div className="game">
                <h1 className="page-heading">ISE1</h1>

                <div className="board">
                    <div className="ui equal width padded grid bordered">
                        <div className="equal width row board-row">
                            <div className="column board-column">
                                <div className="board-field">Äquivalentes Basisband</div>
                            </div>
                            <div className="column board-column">
                                <div className="board-field">Harte Tastung</div>
                            </div>
                            <div className="column board-column">
                                <div className="board-field">Test Test Test Test</div>
                            </div>
                            <div className="column board-column">
                                <div className="board-field">FFT</div>
                            </div>
                            <div className="column board-column">
                                <div className="board-field">Faltungsintegral</div>
                            </div>
                        </div>
                        <div className="equal width row board-row">
                            <div className="column board-column">
                                <div className="board-field">Nyquist/ -kriterium / -theorem</div>
                            </div>
                            <div className="column board-column">
                                <div className="board-field">Hallo</div>
                            </div>
                            <div className="column board-column">
                                <div className="board-field">Test Test Test Test</div>
                            </div>
                            <div className="column board-column">
                                <div className="board-field">Hallo</div>
                            </div>
                            <div className="column board-column">
                                <div className="board-field">Faltungssintegral</div>
                            </div>
                        </div>
                        <div className="equal width row board-row">
                            <div className="column board-column">
                                <div className="board-field">Äquivalentes Basisband</div>
                            </div>
                            <div className="column board-column">
                                <div className="board-field">Harte Tastung</div>
                            </div>
                            <div className="column board-column">
                                <div className="board-field">Test Test Test Test</div>
                            </div>
                            <div className="column board-column">
                                <div className="board-field">FFT</div>
                            </div>
                            <div className="column board-column">
                                <div className="board-field">Faltungsintegral</div>
                            </div>
                        </div>
                        <div className="equal width row board-row">
                            <div className="column board-column">
                                <div className="board-field">Nyquist/ -kriterium / -theorem</div>
                            </div>
                            <div className="column board-column">
                                <div className="board-field">Hallo</div>
                            </div>
                            <div className="column board-column">
                                <div className="board-field">Test Test Test Test</div>
                            </div>
                            <div className="column board-column">
                                <div className="board-field">Hallo</div>
                            </div>
                            <div className="column board-column">
                                <div className="board-field">Faltungssintegral</div>
                            </div>
                        </div>
                        <div className="equal width row board-row">
                            <div className="column board-column">
                                <div className="board-field">Äquivalentes Basisband</div>
                            </div>
                            <div className="column board-column">
                                <div className="board-field">Harte Tastung</div>
                            </div>
                            <div className="column board-column">
                                <div className="board-field">Test Test Test Test</div>
                            </div>
                            <div className="column board-column">
                                <div className="board-field">FFT</div>
                            </div>
                            <div className="column board-column">
                                <div className="board-field">Faltungsintegral</div>
                            </div>
                        </div>
                    </div>
                </div>
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