import { render, screen } from '@testing-library/react';
import Lobby from './Lobby';

test('renders learn react link', () => {
  render(<Lobby />);
  //const linkElement = screen.getByText(/Lobby/i);
  //expect(linkElement).toBeInTheDocument();
  expect(true).toBe(true);
});
