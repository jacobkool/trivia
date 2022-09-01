import './App.css';
import GetQuestions from './GetQuestions';
import {useState} from 'react'
import styled from '@emotion/styled';
import Question from './Question';





function App(): JSX.Element  {
  const [questions, setQuestions] = useState([])

  let fullquestion = {
    correct_answer: "Westworld",
    incorrect_answers: ['Runaway', 'Android', 'The Terminators'],
    question: "In which 1973 film does Yul Brynner play a robotic cowboy who malfunctions and goes on a killing spree?"
  }

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
    `

    const HeaderTitleText = styled.div`
        margin: 0;
        text-transform: uppercase;
        font-weight: 900;
        font-size: 2.5rem;
        letter-spacing: 3px;
        text-shadow: -1px 1px 0px grey
    `

    const HeaderInstructionText = styled.div`
        margin-top: .5rem;
        font-weight: 300;
        font-size: 1.3rem;
    `

    const QuestionWrapper = styled.div`
        height: 56vh;
        width: 70%;
        border: black solid 1px;
        display: flex;
        justify-content: center;
        align-items: center;
    `
 

  return  (

    //todo: create entire trivia app
    <AppContainer>
      <HeaderContainer>
        <HeaderTitleText>
          Welcome to build your own trivia
        </HeaderTitleText>
        <HeaderInstructionText>
          Select a category, difficulty, and number of questions below and see how well you can do!
        </HeaderInstructionText>
      </HeaderContainer>
      <GetQuestions setQuestions={setQuestions} />
      <QuestionWrapper>
        <Question 
            question={fullquestion.question} 
            correct_answer={fullquestion.correct_answer} 
            incorrect_answers={fullquestion.incorrect_answers}
         />
      </QuestionWrapper>
      <div onClick={()=>console.log(questions)}>console log question state</div>
    </AppContainer>
  );
}

export default App;
