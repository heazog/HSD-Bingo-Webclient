import { render, screen } from '@testing-library/react';
import Game from './Game';

test('renders learn react link', () => {
  render(<Game />);
  const linkElement = screen.getByText(/Game/i);
  expect(linkElement).toBeInTheDocument();
});

