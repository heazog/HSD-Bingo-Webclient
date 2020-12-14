import { render, screen } from '@testing-library/react';
import Game from './Game';
import data from "../Data";

test('Game UI Test', () => {
  render(<Game />);
  const heading = screen.getByText(/ISE1/i);
  expect(heading).toBeInTheDocument();


});

