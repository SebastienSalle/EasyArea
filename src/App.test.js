import { render, screen } from '@testing-library/react';
import App from './App';

test('renders open source project', () => {
  render(<App />);
  const linkElement = screen.getByText(/open source project/i);
  expect(linkElement).toBeInTheDocument();
});
