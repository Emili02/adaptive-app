import React, { useState } from 'react';
import {
    Container,
    Paper,
    Typography,
    RadioGroup,
    FormControlLabel,
    Radio,
    Button,
    Box,
    Stepper,
    Step,
    StepLabel
} from '@mui/material';

const InitialTest = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [answers, setAnswers] = useState({});

    const questions = [
        {
            id: 1,
            question: "Какой у вас опыт работы в данной сфере?",
            options: ["Нет опыта", "До 1 года", "1-3 года", "Более 3 лет"]
        },
        {
            id: 2,
            question: "Требуется ли вам специальное оборудование для работы?",
            options: ["Да", "Нет"]
        },
        // Добавьте больше вопросов
    ];

    const handleNext = () => {
        if (activeStep === questions.length - 1) {
            // Отправка результатов
            console.log('Test completed:', answers);
        } else {
            setActiveStep(prev => prev + 1);
        }
    };

    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Начальное тестирование
                </Typography>
                
                <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                    {questions.map((_, index) => (
                        <Step key={index}>
                            <StepLabel>Вопрос {index + 1}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        {questions[activeStep].question}
                    </Typography>
                    
                    <RadioGroup
                        value={answers[questions[activeStep].id] || ''}
                        onChange={(e) => setAnswers({
                            ...answers,
                            [questions[activeStep].id]: e.target.value
                        })}
                    >
                        {questions[activeStep].options.map((option) => (
                            <FormControlLabel
                                key={option}
                                value={option}
                                control={<Radio />}
                                label={option}
                            />
                        ))}
                    </RadioGroup>
                </Box>

                <Button
                    variant="contained"
                    onClick={handleNext}
                    disabled={!answers[questions[activeStep].id]}
                >
                    {activeStep === questions.length - 1 ? 'Завершить' : 'Далее'}
                </Button>
            </Paper>
        </Container>
    );
};

export default InitialTest; 