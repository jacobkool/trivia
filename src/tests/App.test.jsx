import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import GetQuestions from '../GetQuestions';

test('Button is enabled on page load', () => {
    render(<App/>)
    const GetButton = screen.getAllByRole('button')[2]
    expect(GetButton).toBeEnabled();
});

test('Button is disabled on page invalid number input', () => {
  render(<App/>)
  const numinput= screen.getByLabelText(/Number of Questions/i)
  expect(numinput).toBeInTheDocument();

  userEvent.clear(numinput);
  userEvent.type(numinput, '1');

  const GetButton = screen.getAllByRole('button')[2]
  expect(GetButton).toBeDisabled();
});

test('Updates dropdown inputs on selection', () => {
  render(<App/>)
  const catInput= screen.getAllByRole('button')[0]
  expect(catInput).toBeInTheDocument();
  expect(catInput).toHaveTextContent('General Knowledge')

  const difficultyInput = screen.getAllByRole('button')[1]
  expect(difficultyInput).toBeInTheDocument();
  expect(difficultyInput).toHaveTextContent('Any Difficulty')
});