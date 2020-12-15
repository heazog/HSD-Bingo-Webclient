import Game from './Game';
import {act} from "react-dom/cjs/react-dom-test-utils.development";
import ReactDOM from "react-dom";
import React from "react";

test('Game UI Test', () => {
    let container = document.createElement('div');
    document.body.appendChild(container);

    act(() => {
        ReactDOM.render(<Game />, container);
    });

    //Button
    const button = container.querySelector('button');
    expect(button.innerHTML).toBe('Spiel verlassen');

    //Button
    const header = container.querySelector('h1');
    expect(header.innerHTML).toBe('');


});

