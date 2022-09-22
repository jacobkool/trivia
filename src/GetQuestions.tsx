import {useEffect} from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import styled from '@emotion/styled';


interface Props {
    difficulty: string
    setDifficulty: React.Dispatch<React.SetStateAction<string>>
    category: number
    setCategory: React.Dispatch<React.SetStateAction<number>>
    numOfQuestions: number
    setNumOfQuestions: React.Dispatch<React.SetStateAction<number>>
    getQuestionsFromAPI: Function
    buttonEnabled: boolean
    setButtonEnabled: React.Dispatch<React.SetStateAction<boolean>>
}

const GetQuestions = ({difficulty, setDifficulty, category, setCategory, numOfQuestions, setNumOfQuestions, getQuestionsFromAPI, buttonEnabled, setButtonEnabled}:any):JSX.Element => {
    useEffect(() => {
        if (numOfQuestions >= 5 && numOfQuestions <= 10) {
            setButtonEnabled(true)
        } else {
            setButtonEnabled(false)
        }
      }, [numOfQuestions]);

    const handleDifficultyChange = (event: SelectChangeEvent) => {
        setDifficulty(event.target.value);
      };

    const handleCategoryChange = (event: SelectChangeEvent) => {
        setCategory(event.target.value);
    }

    const handleNumOfQuestionsChange = (evt:any) => {
        setNumOfQuestions(evt.target.value)
    }


    const QuestionFormContainer = styled.div`
        display: flex;
        border: black solid 1px;
        margin: 3rem;
        align-items: center;
        justify-content: space-evenly;
        padding: 1rem;
        flex-wrap: wrap;
        gap: 1.5rem;
        flex-direction: column;
    `

    const OptionsWrapper = styled.div`
        display: flex;
        margin: 3rem;
        align-items: center;
        justify-content: space-evenly;
        padding: 1rem;
        flex-wrap: wrap;
        gap: 1.5rem;
    `



    const ButtonWrapper = styled.div`
        padding-bottom: 3rem;
    `

    return (
    <QuestionFormContainer>
        <OptionsWrapper>
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
                            <MenuItem value={'16'}>Entertainment: Board Games</MenuItem>
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
                        label="Difficulty *"
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
                    label="Number of Questions (5-10)" 
                    variant="outlined" 
                    value={numOfQuestions}
                    onChange={handleNumOfQuestionsChange}
                    error={!buttonEnabled}
                    inputProps={{
                        inputMode: 'numeric', 
                        pattern: '[5-10]*'
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
                    helperText={buttonEnabled ? '' : 'Please provide a number between 5-10'}
                />
            </OptionsWrapper>
                <ButtonWrapper>
                    <Button onClick={getQuestionsFromAPI} variant="contained" disabled={!buttonEnabled}>
                        Get Questions
                    </Button>
                </ButtonWrapper>           
        </QuestionFormContainer>
    )
}

export default GetQuestions;