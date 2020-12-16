import End from './End';
import {act} from "react-dom/cjs/react-dom-test-utils.development";
import ReactDOM from "react-dom";
import React from "react";

test('Start UI Test', () => {
  let container = document.createElement('div');
  document.body.appendChild(container);

  act(() => {
    ReactDOM.render(<End />, container);
  });

  //Button
  const button = container.querySelector('EndButton')[0];
  expect(button.innerHTML).toBe('Erneut spielen'); 

  const button = container.querySelector('EndButton')[1];
  expect(button.innerHTML).toBe('Spiel verlassen'); 
});
