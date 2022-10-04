import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    const timer = setTimeout(()=> {
      setTimeRemaining((timeRemaining) => timeRemaining -1);
    }, 1000);
    //   setCount('Timeout called!');
    // }, 1000);
    // effect
    return () => {
      // cleanup
      clearTimeout(timer);
    };
  }, [timeRemaining, onAnswered]);
  //the component is re-rendered every time the two variables are called

  if (timeRemaining === 0){
    setTimeRemaining(10); 
    //re-adjusts the time and prevents the timer from becoming a negative value
    onAnswered(false);
    return; 
  }
  
  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
