import { render, screen } from '@testing-library/react';
import Game from './Game';

test('renders learn react link', () => {
  render(<Game />);
  const heading = screen.getByText(/ISE1/i);
  expect(heading).toBeInTheDocument();


});

