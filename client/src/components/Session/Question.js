import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { getQuestionDetail, createResponse } from '../../actions/session'
import Loading from '../Shared/Loading'
import styled from 'styled-components'
import {
  Heading,
  Button,
  Text,
  Box
} from 'rebass'

import { Label, Radio } from '@rebass/forms'
import { useDidMountEffect } from '../../utils/helpers'


const mapDispatchToProps = { getQuestionDetail, createResponse }

const mapStateToProps = (state) => {
  return state
}

const Question = (props) => {

  const [selectedAnswer, setSelectedAnswer] = useState(null)

  useDidMountEffect(() => {
    setSelectedAnswer(null)
    const currentQuestionId = props.session.currentQuestion.question_id
    const currentQuestionIndex = props.session.currentSection.question_order.indexOf(currentQuestionId)
    const nextQuestion = props.session.currentSection.question_order[currentQuestionIndex + 1]

    props.getQuestionDetail(nextQuestion)

  }, [props.session.newResponse])

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
          return (
            <Label
              key={i}
            >
              <Radio
                name='question'
                value={option}
                onClick={(e) => {
                  setSelectedAnswer(e.target.value)
                }}
              />
              {option}
            </Label>
          )
        })}
      </Box>


      <Button
        onClick={() => {
          props.createResponse(
            props.session.currentSession.session_id,
            props.session.currentQuestion.question_id,
            1,
            props.session.currentSection.section_id,
            selectedAnswer
          )
        }}
      >
        Next Question
      </Button>

    </Container >
  )
}

const Container = styled.div`
  padding: 30px 0;
`


export default connect(mapStateToProps, mapDispatchToProps)(Question)
