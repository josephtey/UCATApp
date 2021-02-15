import React from 'react'


export const decision_making_description = () => {
  return (
    <>
      <p>In this section of the exam, you will be presented with questions that may refer to text, charts or graphs. Additional information may be presented within the question itself. All questions are standalone and do not share data.</p>

      <p>Some questions will have four answer options but only one correct answer; others will require you to respond to five statements by placing a 'yes' or 'no' answer next to each statement.</p>
    </>
  )
}

export const quantitative_reasoning_description = () => {
  return (
    <>
      <p>In this section of the exam, you will be presented with questions that most often refer to charts and graphs containing data. Additional information may also be found within the question itself. Most questions will be shown as sets of four questions each connected to the same data. There are some questions that standalone and do not share data. Each question has five answer options. Your task is to choose the best option.</p>

      <p>An onscreen calculator is available to assist you with this section – you can access this by clicking on the button at the top left of the screen.</p>
    </>
  )
}

export const verbal_reasoning_description = () => {
  return (
    <>
      <p>
        In this section of the exam, you will be presented with 11 passages to read, each associated with 4 questions.
      </p>
      <p>
        Some questions assess critical reasoning skills, requiring candidates to make inferences and draw conclusions from information.  You will need to read the passage of text carefully.  You will then be presented with a question or incomplete statement and four response options. You are required to pick the best or most suitable response.
      </p>
      <p>
        For other questions your task is to read each passage of text carefully and then decide whether the statement provided follows logically.  There are three answer options you can choose from
      </p>
      <p>
        True: On the basis of the information in the passage, the statement is true.
      </p>
      <p>
        False: On the basis of the information in the passage, the statement is false.
      </p>
      <p>
        Can’t Tell: You cannot tell from the information in the passage whether the statement is true or false.
      </p>
      <p>
        Candidates will only be able to select one response.
      </p>

    </>
  )
}

export const abstract_reasoning_description = () => {
  return (
    <>
      <p>
        There are 4 different question types in this section of the exam.
      </p>
      <p>
        For type 1, you will be presented with two sets of shapes labelled “Set A” and “Set B”. You will be given a test shape and asked to decide whether the test shape belongs to Set A, Set B, or Neither.
      </p>
      <p>
        For type 2, you will be presented with a series of shapes. You will be asked to select the next shape in the series.
      </p>
      <p>
        For type 3, you will be presented with a statement, involving a group of shapes. You will be asked to determine which shape completes the statement.
      </p>
      <p>
        For type 4, you will be presented with two sets of shapes labelled “Set A” and “Set B”. You will be asked to select which of the four response options belongs to Set A or Set B.
      </p>
      <p>
        You will have 13 minutes to answer 55 questions.It is in your best interest to answer all questions as there is no penalty for guessing. All unanswered questions will be scored as incorrect.
      </p>
    </>
  )
}

export const situational_judgement_description = () => {
  return (
    <>
      <p>
        You will be presented with a set of hypothetical scenarios based in a clinical setting or during educational training for a medical or dental career. These may involve a student or clinician at their centre.
      </p>
      <p>
        Please read each scenario carefully.
      </p>
      <p>
        This subtest consists of two parts. For Part One you will be asked to rate the importance of a series of statements in response to the scenario.
      </p>
      <p>
        For Part Two you will be asked to rate the appropriateness of a series of statements in response to the scenario.
      </p>
      <p>
        Some of the questions will require that you rate each response from four possible options. Other questions will require you to choose the most and least appropriate action to take in response to the situation, from the three actions provided.
      </p>
      <p>
        Please remember that in the live test you will be given a banded result for this section but you will not be given a score.
      </p>
    </>
  )
}

export const descriptions = {
  "Decision Making": decision_making_description,
  "Quantitative Reasoning": quantitative_reasoning_description,
  "Verbal Reasoning": verbal_reasoning_description,
  "Abstract Reasoning": abstract_reasoning_description,
  "Situational Judgement": situational_judgement_description
}
