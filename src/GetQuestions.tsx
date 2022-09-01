import {useState} from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import styled from '@emotion/styled';
import axios from 'axios';

// interface Props {
//     setQuestions: (value: any[] | (prevQuestions: any[]) => any[]) => void;
// }

const GetQuestions = (props:any) => {
    const [difficulty, setDifficulty] = useState('any')
    const [category, setCategory] = useState('9')
    const [numOfQuestions, setNumOfQuestions] = useState('10')
    const [buttonEnabled, setButtonEnabled] = useState(true);

    const handleDifficultyChange = (event: SelectChangeEvent) => {
        setDifficulty(event.target.value);
      };

    const handleCategoryChange = (event: SelectChangeEvent) => {
        setCategory(event.target.value);
    }

    const validNumbers = ['10', '11',  '12', '13', '14', '15', '16', '17', '18','19', '20']

    const handleNumOfQuestionsChange = (evt:any):void => {
        evt.preventDefault();
        setNumOfQuestions(evt.target.value)
        if (validNumbers.indexOf(evt.target.value) === -1) {
            setButtonEnabled(false);
        } else {
            setButtonEnabled(true);
        }
    }

    const getQuestionsFromAPI = async ():Promise<void> => {
        const data = await axios.get(`https://opentdb.com/api.php?amount=${numOfQuestions}&category=${category}&difficulty=${difficulty === 'any' ? '' : difficulty}&type=multiple`);
        props.setQuestions(data.data.results);
    }


    const QuestionFormContainer = styled.div`
        display: flex;
        border: black solid 1px;
        margin: 3rem;
        align-items: center;
        justify-content: space-evenly;
        padding: 1rem;
    `

    const ButtonWrapper = styled.div`
        padding-left: 10px;
    `

    return (
    <QuestionFormContainer>
                <FormControl required sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-required-label">Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-required-label"
                        id="demo-simple-select-required"
                        label="Category *"
                        value={category}
                        onChange={handleCategoryChange}
                    >
                            <MenuItem value={'9'}>General Knowledge</MenuItem>
                            <MenuItem value={'11'}>Entertainment: Film</MenuItem>
                            <MenuItem value={'12'}>Entertainment: Music</MenuItem>
                            <MenuItem value={'14'}>Entertainment: Television</MenuItem>
                            <MenuItem value={'15'}>Entertainment: Video Games</MenuItem>
                            <MenuItem value={'16'}>Entertainment: Video Games</MenuItem>
                            <MenuItem value={'17'}>Science and Nature</MenuItem>
                            <MenuItem value={'18'}>Science: Computers</MenuItem>
                            <MenuItem value={'19'}>Science: Math</MenuItem>
                            <MenuItem value={'21'}>Sports</MenuItem>
                            <MenuItem value={'22'}>Geography</MenuItem>
                            <MenuItem value={'23'}>History</MenuItem>
                            <MenuItem value={'26'}>Celebrities</MenuItem>
                            <MenuItem value={'27'}>Animals</MenuItem>
                    </Select>
                </FormControl>
                <FormControl required sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-required-label">Difficulty</InputLabel>
                    <Select
                        labelId="demo-simple-select-required-label"
                        id="demo-simple-select-required"
                        label="Age *"
                        onChange={handleDifficultyChange}
                        value={difficulty}
                    >
                            <MenuItem value={'any'}>Any Difficulty</MenuItem>
                            <MenuItem value={'easy'}>Easy</MenuItem>
                            <MenuItem value={'medium'}>Medium</MenuItem>
                            <MenuItem value={'hard'}>Hard</MenuItem>                           
                    </Select>
                </FormControl>
                <TextField 
                    id={buttonEnabled ? "outlined-basic" : 'standard-error-helper-text'}
                    label="Number of Questions (10-20)" 
                    variant="outlined" 
                    value={numOfQuestions}
                    onChange={handleNumOfQuestionsChange}
                    error={!buttonEnabled}
                    inputProps={{
                        inputMode: 'numeric', 
                        pattern: '[10-20]*'
                    }}
                    sx={{
                        '& .MuiFormHelperText-root': {
                          marginLeft: 0,
                          marginRight: 0,
                          bottom: '-14px',
                          position: 'absolute'
                        },
                      }}
                    key='key'
                    autoFocus
                    helperText={buttonEnabled ? '' : 'Please provide a number between 10-20'}
                />
                <ButtonWrapper>
                    <Button onClick={getQuestionsFromAPI} variant="contained" disabled={!buttonEnabled}>
                        Get Questions
                    </Button>
                </ButtonWrapper>           
        </QuestionFormContainer>
    )
}

export default GetQuestions;