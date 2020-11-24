import { render, screen } from '@testing-library/react';
import Start from './Start';

test('renders learn react link', () => {
  render(<Start />);
  const linkElement = screen.getByText(/Start/i);
  expect(linkElement).toBeInTheDocument();
});
