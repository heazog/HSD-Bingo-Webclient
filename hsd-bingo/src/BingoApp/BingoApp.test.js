import { render, screen } from '@testing-library/react';
import BingoApp from './BingoApp';

test('renders learn react link', () => {
  render(<BingoApp />);
  const linkElement = screen.getByText(/Hallo/i);
  expect(linkElement).toBeInTheDocument();
});
