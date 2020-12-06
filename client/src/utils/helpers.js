import React, { useEffect, useRef } from 'react';

export const useDidMountEffect = (func, deps) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
  }, deps);
}

export const getIncompleteQuestions = (questions, responses) => {
  let incompleteQuestions = []

  for (let i = 0; i < questions.length; i++) {
    let questionExists = false
    for (let j = 0; j < responses.length; j++) {
      if (responses[j].question_id === questions[i]) {
        questionExists = true
        break
      }
    }
    if (!questionExists) {
      incompleteQuestions.push(questions[i])
    }
  }

  return incompleteQuestions
}

export const filterResponses = (responses, property) => {
  let filteredResponses = []

  for (let i = 0; i < responses.length; i++) {
    if (responses[i][property]) {
      filteredResponses.push(responses[i].question_id)
    }
  }

  return filteredResponses
}