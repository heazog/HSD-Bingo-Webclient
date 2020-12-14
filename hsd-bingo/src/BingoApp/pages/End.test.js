import { render, screen } from '@testing-library/react';
import End from './End';

test('renders learn react link', () => {
  render(<End />);
  const linkElement = screen.getByText(/End/i);
  expect(linkElement).toBeInTheDocument();
  expect(true).toBe(true);
});
