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

export const filterResponses = (responses, property, value = true) => {
  let filteredResponses = []

  for (let i = 0; i < responses.length; i++) {
    if (responses[i][property] === value) {
      filteredResponses.push(responses[i].question_id)
    }
  }

  return filteredResponses
}

export const setCookie = (name, value, days) => {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
export const getCookie = (name) => {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
export const eraseCookie = (name) => {
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}