import React from 'react';
import { render, screen } from '@testing-library/react';
import GetQuestions from '../GetQuestions';

test('renders inputs', () => {
    render(<GetQuestions
        difficulty={'Any Difficulty'}
        category={'General Knowledge'}
        numOfQuestions={'5'}
    />)
    const GetButton = screen.getAllByRole('button')[2]
    expect(GetButton).toBeEnabled();
})
  