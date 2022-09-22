import styled from "@emotion/styled"
import './question.css'

interface Props {
    question: string
    correct_answer: string
    incorrect_answers: string[]
    setCurrQuestionIndex: React.Dispatch<React.SetStateAction<number>>
    currQuestionIndex: number
    questionsLength: number
    getQuestionsFromAPI: Function
}


const Question = ({question, correct_answer, incorrect_answers, setCurrQuestionIndex, currQuestionIndex, questionsLength, getQuestionsFromAPI}:Props):JSX.Element => {
    const Container = styled.div`
        display: flex;
        flex-direction: column;    
        width: 100%;
        height: 100%;
        justify-content: space-between;
        align-items: center;
    `

    const QuestionContainer = styled.div`
        display: flex;
        flex-direction: column;
        width: 100%;
        border-bottom: 5px solid black;
    `

    const AnswerContainer = styled.div`
        display: grid;
        grid-template-columns: 50% 50%;
        grid-template-rows: 50% 50%;    
        height: 60%;
        width: 100%;
        margin: 2rem;
        justify-items: center;
        align-items: center;
        margin-top: 1.5rem;
        padding-top: 1rem;
        flex-shrink: 1;
        @media (max-width:650px) {
            grid-template-rows: 25% 25% 25% 25%;
            grid-template-columns: 100%;
          }
    `

    const Answer = styled.div`
        margin: 1rem;
        font-size: 2.2rem;
        cursor: pointer;
        background-color: lightGrey;
        border-radius: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 2px solid black;
        transition: transform 0.5s;
        text-align: center;
        width: 80%;
        min-width: 150px;
        height: 75%;
        padding: 1rem;
        &:hover {
            background-color: pink;
            transform: translateY(-.5rem)
        }
    `

    const Question = styled.div`
        font-size: 2rem;
        font-weight: 600;
        margin-top: 1.5rem;
        margin-bottom: 1.rem;
        grid-column: 1/3;
        grid-row: 0/1;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding: 0 1.5rem 1.5rem 1.5rem;
        text-align: center;
    `

    const Progress = styled.div`
        font-size: 1.5rem;
        font-weight: bold;
        margin: .5rem;
    `

    let answerArr:string[]=[];

    const shuffleCorrectIntoAnswerArr = (correct:string, arr:string[]):void => {
        answerArr = [...arr];
        let indexOfCorrect = Math.floor(Math.random() * 4);

        answerArr.splice(indexOfCorrect, 0, correct);
    }
    
    shuffleCorrectIntoAnswerArr(correct_answer, incorrect_answers);

    const checkForWin = () => {
        if (currQuestionIndex + 1 === questionsLength) {
            alert('Congratulations! You did  it!')
            window.location.reload();
        }
    }

    let timeout:boolean = false;

    const handleAnswerClick = (evt:any):void => {
        if (timeout === true) {
            return;
        }
        timeout = true;
        if (evt.target.innerHTML === correct_answer) {
            evt.target.className = 'correct_selection';
            checkForWin();
            setTimeout(() =>
                setCurrQuestionIndex(currQuestionIndex + 1)
            , 1500)
            
        } else {
            evt.target.className = 'incorrect_selection';         
            setTimeout( async () => {
                await getQuestionsFromAPI()
                setCurrQuestionIndex(0)
            }, 1500) 
        }
    }

    return (
        <Container>
            <>
                <QuestionContainer>
                    <Progress>Question: {currQuestionIndex + 1} / {questionsLength}</Progress>
                    <Question dangerouslySetInnerHTML={{__html: question}}/>
                </QuestionContainer>
                <AnswerContainer>
                    {answerArr.map((answer) => 
                        <Answer key={Math.random()} onClick={evt => handleAnswerClick(evt)} dangerouslySetInnerHTML={{__html: answer}}/>
                    )}
                </AnswerContainer>
            </>
        </Container>
        
    )
}

export default Question