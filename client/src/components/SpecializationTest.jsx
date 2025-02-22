import React, { useState } from 'react';

const specializationQuestions = [
  {
    question: "What is your primary area of expertise?",
    options: ["Frontend Development", "Backend Development", "Full Stack Development", "DevOps"]
  },
  {
    question: "How many years of experience do you have in your field?",
    options: ["0-1 years", "1-3 years", "3-5 years", "5+ years"]
  },
  // Добавьте больше вопросов по мере необходимости
];

const SpecializationTest = () => {
  const [answers, setAnswers] = useState({});

  const handleChange = (question, answer) => {
    setAnswers({
      ...answers,
      [question]: answer
    });
  };

  return (
    <div>
      <h1>Specialization Test</h1>
      {specializationQuestions.map((q, index) => (
        <div key={index}>
          <p>{q.question}</p>
          {q.options.map((option, i) => (
            <label key={i}>
              <input
                type="radio"
                name={q.question}
                value={option}
                onChange={() => handleChange(q.question, option)}
              />
              {option}
            </label>
          ))}
        </div>
      ))}
      <button onClick={() => console.log(answers)}>Submit</button>
    </div>
  );
};

export default SpecializationTest;