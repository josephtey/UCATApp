import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { getQuestionDetail, createResponse, reviewSection } from '../../actions/session'
import Loading from '../Shared/Loading'
import styled from 'styled-components'
import {
  Heading,
  Button,
  Text,
  Box
} from 'rebass'

import { Label, Radio } from '@rebass/forms'
import ResponseStatus from './ResponseStatus';


const mapDispatchToProps = { getQuestionDetail, createResponse, reviewSection }

const mapStateToProps = (state) => {
  return state
}

const Question = (props) => {

  if (props.session.isFetchingQuestionDetail) return <Loading />
  if (!props.session.currentQuestion) return null

  return (
    <Container>
      <Heading>
        {props.session.currentQuestion.question}
      </Heading>

      <Box
        as='form'
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        {props.session.currentQuestion.options.map((option, i) => {
          const response = props.session.sessionResponses.find(
            item => item.question_id === props.session.currentQuestion.question_id
          )
          return (
            <Label
              key={i}
            >
              <Radio
                name='question'
                value={option}
                onClick={(e) => {
                  props.createResponse(
                    props.session.currentSession.session_id,
                    props.session.currentQuestion.question_id,
                    1,
                    props.session.currentSection.section_id,
                    e.target.value
                  )
                }}
                defaultChecked={response && response.value === option ? true : false}
              />
              {option}
            </Label>
          )
        })}
      </Box>


      {props.session.currentQuestion.question_id !== props.session.currentSection.question_order.slice(-1)[0] ?
        <Button
          onClick={() => {
            const currentQuestionId = props.session.currentQuestion.question_id
            const currentQuestionIndex = props.session.currentSection.question_order.indexOf(currentQuestionId)
            const nextQuestion = props.session.currentSection.question_order[currentQuestionIndex + 1]
            props.getQuestionDetail(nextQuestion)
          }}
        >
          Next Question
        </Button>
        : null}

      <Button
        onClick={() => {
          props.reviewSection()
        }}
        variant="secondary"

      >
        Review Section
      </Button>

      <ResponseStatus />

    </Container >
  )
}

const Container = styled.div`
  padding: 30px 0;
`


export default connect(mapStateToProps, mapDispatchToProps)(Question)
