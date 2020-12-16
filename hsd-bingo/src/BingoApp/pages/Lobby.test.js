import Lobby from './Lobby';
import {act} from "react-dom/cjs/react-dom-test-utils.development";
import ReactDOM from "react-dom";
import React from "react";

test('Game UI Test', () => {
    let container = document.createElement('div');
    document.body.appendChild(container);

    act(() => {
        ReactDOM.render(<Lobby />, container);
    });

    const button1 = container.getElementsByClassName('LobbyButton')[0];
    expect(button1.innerHTML).toBe('Zurück');

    const button2 = container.getElementsByClassName('LobbyButton')[1];
    expect(button2.innerHTML).toBe('Bereit');

    const table = container.getElementsByClassName('LobbyTable')[0];
    expect(table.childNodes[0].innerHTML).toBe('<tr class=\"\"><th class=\"\">Spieler</th><th class=\"\">Bereit</th></tr>');
    expect(table.childNodes[0].childNodes[0].childNodes[0].innerHTML).toBe('Spieler');
    expect(table.childNodes[0].childNodes[0].childNodes[1].innerHTML).toBe('Bereit');

    const icon = table.childNodes[1].childNodes[0].childNodes[1].childNodes[0].className;
    expect(icon).toBe('red thumbs down outline icon');
});

