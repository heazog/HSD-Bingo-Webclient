import { render, screen } from '@testing-library/react';
import BingoApp from './BingoApp';

test('renders Bingo App', () => {
  const { container } = render(<BingoApp />);
  expect(container.firstChild.classList.contains('BingoApp')).toBe(true)
});