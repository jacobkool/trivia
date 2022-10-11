import React from 'react';
import { render, screen } from '@testing-library/react';
import Question from '../Question';

test('renders question', () => {
    render(<Question question={'What is 2 + 2'} 
        correct_answer={'4'} 
        incorrect_answers={['1', '2', '3']}
        currQuestionIndex={1}
        questionsLength={5}/>)

    let correctAnswer = screen.getByText('4');
    expect(correctAnswer).toBeInTheDocument();
})