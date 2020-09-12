import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { getSessionDetails, resetSessionDetail } from '../actions/session'
import Loading from '../components/Shared/Loading'
import styled from 'styled-components'
import {
  Heading,
  Button,
  Text,
  Box
} from 'rebass'

import Question from '../components/Session/Question'


const mapDispatchToProps = { getSessionDetails, resetSessionDetail }

const mapStateToProps = (state) => {
  return state
}

const Session = (props) => {

  useEffect(() => {
    // Get Session Details if it doesn't already exist
    if (!props.session.currentSession || props.session.currentSession.session_id.toString() !== props.match.params.session_id) {
      props.getSessionDetails(props.match.params.session_id)
    }

    return () => {
      props.resetSessionDetail()
    }
  }, [])

  if (props.session.isFetchingSessionDetail) return <Loading />
  if (!props.session.currentSession) return null

  return (
    <Container>
      <Text>
        Current Session ID: {props.match.params.session_id}
      </Text>

      <Question />
      {/* <Heading>
        {props.content.questionDetail ? props.content.questionDetail.question : null}
      </Heading>

      <Box
        as='form'
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        {props.content.questionDetail && props.content.questionDetail.options.map((option, i) => {
          return (
            <Label>
              <Radio
                name='question'
                value={option}
                onClick={(e) => {
                  // setSelectedAnswer(e.target.value)
                }}
              />
              {option}
            </Label>
          )
        })}
      </Box>


      <Button
        onClick={() => {
          const currentQuestionIndex = props.content.sectionDetail.details.question_order.indexOf(parseInt(props.match.params.question_id))
          const nextQuestion = props.content.sectionDetail.details.question_order[currentQuestionIndex + 1]

          props.createResponse(props.session.currentSession.session_id, parseInt(props.match.params.question_id), 1, parseInt(props.match.params.section_id), selectedAnswer)

          props.history.push(
            '/exam/' +
            props.match.params.structure_id + '/' +
            props.content.sectionDetail.details.section_id.toString() + '/' +
            nextQuestion.toString()
          )
        }}
      >
        Next Question
      </Button>

      <Status>
        <Heading fontSize={2}>
          Status
        </Heading>
        <Text>
          <ul>
            {props.content.sectionDetail && props.content.sectionDetail.details.question_order.map((question_id, i) => {

              return (
                <li>Question {i}</li>
              )
            })}
          </ul>
        </Text>
      </Status> */}
    </Container >
  )
}

const Status = styled.div`
  padding: 30px 0;
`
const Container = styled.div`
  padding: 30px;
`


export default connect(mapStateToProps, mapDispatchToProps)(Session)
