import { cleanup, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import App from '../App.js';
import ShapeSelector from '../components/ShapeSelector'


test('empty test run properly', () => {});

describe('Rendering App',  () => {
    
  test('should display the link "open source project"', () => {
    render(<App />);
    const linkElement = screen.getByText(/open source project/i);
    //console.log(linkElement);
    expect(linkElement).toBeInTheDocument();
  });
  
});
  
describe('Rendering shapes selector buttons', () => {
    
  test('should render the rectangle', () => {
    render(<App />);
    const addRectangle = screen.getByTestId('button-rectangle');
    expect(addRectangle).toBeInTheDocument();
  });

  test('should render the triangle', () => {
    render(<App />);
    const addTriangle = screen.getByTestId('button-triangle');
    expect(addTriangle).toBeInTheDocument();
  });

  test('should render the trapezoid', () => {
    render(<App />);
    const addTrapezoid = screen.getByTestId('button-trapezoid');
    expect(addTrapezoid).toBeInTheDocument();
  });

  test('should render the circle', () => {
    render(<App />);
    const addCircle = screen.getByTestId('button-circle');
    expect(addCircle).toBeInTheDocument();
  });

  test('should render the square', () => {
    render(<App />);
    const addSquare = screen.getByTestId('button-square');
    expect(addSquare).toBeInTheDocument();
  });

  test('should render the custom area', () => {
    render(<App />);
    const addArea = screen.getByTestId('button-area');
    expect(addArea).toBeInTheDocument();
  });

});

describe('Create cards', () => {

  test('should render default text at initialization', () => {
    render(<App />);
    const emptyMessage = screen.queryByText('Add a SHAPE to start AREA calculation');
    expect(emptyMessage).toBeInTheDocument();
  });

  test('should create a new card for rectangle', async () => {
    render(<App />);
    const addRectangle = screen.getByTestId('button-rectangle');
    await userEvent.click(addRectangle);
    const rectangleCard = screen.getByTitle('rectangle-card');
    expect(rectangleCard).toBeInTheDocument();
  });

  test('should not render default text after adding a card', () => {
    render(<App />);
    const emptyMessage = screen.queryByText('Add a SHAPE to start AREA calculation');
    expect(emptyMessage).not.toBeInTheDocument();
  });

  test('should create a new card for triangle', async () => {
    render(<App />);
    const addTriangle = screen.getByTestId('button-triangle');
    await userEvent.click(addTriangle)
    const triangleCard = screen.getByTitle('triangle-card')
    expect(triangleCard).toBeInTheDocument();
  });

  test('should create a new card for trapezoid', async () => {
    render(<App />);
    const addTrapezoid = screen.getByTestId('button-trapezoid');
    await userEvent.click(addTrapezoid)
    const trapezoidCard = screen.getByTitle('trapezoid-card')
    expect(trapezoidCard).toBeInTheDocument();
  });

  test('should create a new card for circle', async () => {
    render(<App />);
    const addCircle = screen.getByTestId('button-circle');
    await userEvent.click(addCircle)
    const circleCard = screen.getByTitle('circle-card')
    expect(circleCard).toBeInTheDocument();
  });

  test('should create a new card for square', async () => {
    render(<App />);
    const addSquare = screen.getByTestId('button-square');
    await userEvent.click(addSquare)
    const squareCard = screen.getByTitle('square-card')
    expect(squareCard).toBeInTheDocument();
  });

  test('should create a new card for custom area', async () => {
    render(<App />);
    const addArea = screen.getByTestId('button-area');
    await userEvent.click(addArea)
    const areaCard = screen.getByTitle('area-card')
    expect(areaCard).toBeInTheDocument();
  });

});

describe('Delete cards', () => {
  test('should delete the 2nd card among at least 3 cards', async () => {
    render(<App />);
    const crossButtons = screen.queryAllByTitle('delete this card');
    const button = crossButtons[1];
    const cardsBefore = crossButtons.length;

    const cards = screen.getAllByTitle(/-card/);
    const firstBefore = cards[0].title;
    const thirdBefore = cards[2].title;

    await userEvent.click(button);
    
    const newCrossButtons = screen.queryAllByTitle('delete this card');
    const cardsAfter = newCrossButtons.length;
    
    const firstAfter = cards[0].title;
    const secondAfter = cards[1].title;

    expect(firstBefore).toEqual(firstAfter);
    expect(thirdBefore).toEqual(secondAfter);
    expect(cardsAfter).toEqual(cardsBefore-1);
  });
  
});