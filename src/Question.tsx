import styled from "@emotion/styled"
import './question.css'


const Question = ({question, correct_answer, incorrect_answers}:any):JSX.Element => {

    const Container = styled.div`
        display: grid;
        grid-template-rows: 30% 35% 35%;
        grid-template-columns: 50% 50%;
        height: 100%;
        width: 100%;
    `

    const Answer = styled.div`
        margin: 1rem;
        font-size: 2.2rem;
        cursor: pointer;
        background-color: grey;
        border-radius: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 2px solid black;
        &:hover {
            background-color: pink;
            transform: translateY(-.5rem)
        }
    `

    const Question = styled.div`
        font-size: 2rem;
        font-weight: 600;
        margin-bottom: 2rem;
        grid-column: 1/3;
        grid-row: 0/1;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 2rem;
        border-bottom: 5px solid black;
        width: 100%;
        padding-bottom: 2rem;
        text-align: center;
    `
    let answerArr:string[]=[];

    const shuffleCorrectIntoAnswerArr = (correct:string, arr:string[]):void => {
        answerArr = [...arr];
        let indexOfCorrect = Math.floor(Math.random() * 4);

        answerArr.splice(indexOfCorrect, 0, correct);
    }

    shuffleCorrectIntoAnswerArr(correct_answer, incorrect_answers)

    const handleAnswerClick = (evt:any) => {
        if (evt.target.innerHTML === correct_answer) {
            evt.target.className = 'correct_selection';
        }
    }

    return (
        <Container>
            <Question>
                {question}
            </Question>
                <Answer onClick={evt => handleAnswerClick(evt)}>
                    {answerArr[0]}
                </Answer>
                <Answer onClick={evt => handleAnswerClick(evt)}>
                    {answerArr[1]}
                </Answer>
                <Answer onClick={evt => handleAnswerClick(evt)}>
                    {answerArr[2]}
                </Answer>
                <Answer onClick={evt => handleAnswerClick(evt)}>
                    {answerArr[3]}
                </Answer>
        </Container>
        
    )
}

export default Question