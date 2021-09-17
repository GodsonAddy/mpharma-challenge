import { render, screen } from '@testing-library/react';
import App from './App';
import "@testing-library/jest-dom/extend-expect";

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders button correctly", () => {
  const {getByTestId} = render(<App />);
  const clickButton = getByTestId("button");
  expect(clickButton).toBeInTheDocument()
})

test("renders Fab without crashing", () => {
  const {getByTestId} = render(<App />);
  const fabButton = getByTestId("Fab");
  expect(fabButton).toBeInTheDocument()
})

test("renders text correctly", () => {
  const {getByTestId} = render(<App />);
  const displayText = getByTestId("drug");
  expect(displayText.textContent).toBe("Drug")
})

test("renders display correctly", () => {
  const {getByTestId} = render(<App />);
  const displayText = getByTestId("addDrug");
  expect(displayText.textContent).toBe("Add Drug")
})