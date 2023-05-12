import { render, screen } from '@testing-library/react';
import App from './App';

test('renders react testing tutorial', () => {
  render(<App />);
  const linkElement = screen.getByText(/This is React testing tutorial/i);
  expect(linkElement).toBeInTheDocument();
});

it("render login component", () => {
  const component = render(<App />);
  const childEl = component.getByLabelText("Email");
  expect(childEl).toBeInTheDocument();
})
