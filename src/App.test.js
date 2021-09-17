import { render, screen, fireEvent} from '@testing-library/react';
import App from './App';
import "@testing-library/jest-dom/extend-expect";

let getByTestId;
beforeEach(() => {
  const app = render(<App />);
  getByTestId = app.getByTestId
});

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders button correctly", () => {
  const clickButton = getByTestId("button");
  fireEvent.click(clickButton)
})

test("renders Fab without crashing", () => {
  const fabButton = getByTestId("Fab");
  fireEvent.click(fabButton)
})

test("renders text correctly", () => {
  const displayText = getByTestId("drug");
  expect(displayText.textContent).toBe("Drug")
})

test("renders display correctly", () => {
  const displayText = getByTestId("addDrug");
  expect(displayText.textContent).toBe("Add Drug")
})