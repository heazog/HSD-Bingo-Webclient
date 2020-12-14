import { render, screen } from '@testing-library/react';
import Start from './Start';

test('Start UI Test', () => {
  render(<Start />);
    const heading = screen.getByText(/HSD - BINGO!/i);
    expect(heading).toBeInTheDocument();
    const button = screen.getByText(/Absenden/i);
    expect(button).toBeInTheDocument();
    //const nameField = screen.getByText(/Benutzername/i);
    //expect(nameField).toBeInTheDocument();



});
