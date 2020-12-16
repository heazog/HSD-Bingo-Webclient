import { render, screen } from '@testing-library/react';
import End from './End';

test('Start UI Test', () => {
  let container = document.createElement('div');
  document.body.appendChild(container);

  act(() => {
    ReactDOM.render(<End />, container);
  });

  //Button
  const button = container.querySelector('button');
  expect(button.innerHTML).toBe('Erneut spielen'); 

  const button = container.querySelector('button');
  expect(button.innerHTML).toBe('Spiel verlassen'); 
});
