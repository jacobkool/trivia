import './App.css';
import GetQuestions from './GetQuestions';
import {useState} from 'react'
import styled from '@emotion/styled';
import Question from './Question';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import axios from 'axios';

interface Question {
  correct_answer: string;
  question: string;
  incorrect_answers: string[];
}


function App(): JSX.Element  {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currQuestionIndex, setCurrQuestionIndex] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);
  const [difficulty, setDifficulty] = useState('any')
  const [category, setCategory] = useState('9')
  const [numOfQuestions, setNumOfQuestions] = useState('5')

  const AppContainer = styled.div`
        display: flex;
        margin: 2rem;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        flex-direction: column;
    `

    const HeaderContainer = styled.div`
        display: flex;
        margin: .5rem;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        flex-direction: column;
        border-bottom: 1px solid black;
    `

    const HeaderTitleText = styled.div`
        margin: 0;
        text-transform: uppercase;
        font-weight: 900;
        font-size: 2.5rem;
        letter-spacing: 3px;
        text-shadow: -1px 1px 0px grey;
        text-align: center;
    `

    const HeaderInstructionText = styled.div`
        margin-top: .5rem;
        font-weight: 300;
        font-size: 1.3rem;
        text-align: center;
    `

    const QuestionWrapper = styled.div`
        height: 56vh;
        width: 70%;
        max-width: 70rem;
        border: black solid 1px;
        display: flex;
        justify-content: center;
        align-items: center;
        @media (max-width:650px) {
          width: 90%;
          height: 75vh;
        }
    `

    const buildNewTrivia = () => {
      confirmAlert({
        title: 'Confirm to reset',
        message: 'Are you sure you want to reset? This will entirely remove this question set.',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {
              setQuestions([])
              setCurrQuestionIndex(0)
            }
          },
          {
            label: 'No',
            onClick: () => {return}
          }
        ]
      })
    }

    function shuffleArray(array:any[]) {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
  }

    const getQuestionsFromAPI = async ():Promise<void> => {
      const data = await axios.get(`https://opentdb.com/api.php?amount=${numOfQuestions}&category=${category}&difficulty=${difficulty === 'any' ? '' : difficulty}&type=multiple`);
      let arr = data.data.results;
      setError(false)
      shuffleArray(arr)
      setQuestions(arr);
      if (arr.length < numOfQuestions) {
          setError(true);
          throw new Error('Oops, it looks like there is not data available for the selected values')
      }
  }
 
    return (
      <AppContainer>
        <>
        <HeaderContainer>
          <HeaderTitleText>
            Welcome to build your own trivia
          </HeaderTitleText>
          <HeaderInstructionText>
            Select a category, difficulty, and number of questions below and see how well you can do!
          </HeaderInstructionText>
        </HeaderContainer>
          {questions.length ? 
          <div className='game_instructions'>
            <div>
              Good luck! The goal of the game is to answers all of the questions correctly in a row. Any incorrect answers will send you back to the start!
            </div>
            <button className='get_new_button' onClick={buildNewTrivia}>Get new set of questions</button>
          </div> : 
         <GetQuestions 
              getQuestionsFromAPI={getQuestionsFromAPI}
              difficulty={difficulty}
              setDifficulty={setDifficulty}
              category={category}
              setCategory={setCategory}
              numOfQuestions={numOfQuestions}
              setNumOfQuestions={setNumOfQuestions}
              />
          }
        
        {!!questions.length && 
          <QuestionWrapper>
            <Question 
                question={questions[currQuestionIndex].question} 
                correct_answer={questions[currQuestionIndex].correct_answer} 
                incorrect_answers={questions[currQuestionIndex].incorrect_answers}
                setCurrQuestionIndex={setCurrQuestionIndex}
                currQuestionIndex={currQuestionIndex}
                questionsLength={questions.length}
                getQuestionsFromAPI={getQuestionsFromAPI}
            />
          </QuestionWrapper>
        }
        {error && 
        <div className='error_text'>
          Oops! Looks like we didn't get any questions on that request. Some of the categories do not have enough questions of certain levels. Example: Math - Easy - 10 questions. Please try again, and if receiving more errors check your internet connection. 
        </div>        
        }
        
        </>
    </AppContainer>
    )
  

  
}

export default App;
