import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { getQuestionDetail, resetQuestionDetail, getSectionDetail } from '../actions/content'
import { getSessionResponses, createResponse } from '../actions/session'
import Loading from '../components/Shared/Loading'
import styled from 'styled-components'
import {
  Heading,
  Button,
  Text,
  Box
} from 'rebass'

import { Label, Radio } from '@rebass/forms'


const mapDispatchToProps = { getQuestionDetail, getSectionDetail, resetQuestionDetail, getSessionResponses, createResponse }

const mapStateToProps = (state) => {
  return state
}

const Question = (props) => {

  const [selectedAnswer, setSelectedAnswer] = useState(null)

  useEffect(() => {
    setSelectedAnswer(null)
    props.getQuestionDetail(parseInt(props.match.params.question_id))
    props.getSessionResponses(parseInt(props.session.currentSession.session_id), "section", parseInt(props.match.params.section_id))

    return () => {
      props.resetQuestionDetail()
    }
  }, [props.match.params.question_id])

  if (props.content.isFetchingQuestionDetail) return <Loading />
  if (!props.content.questionDetail) return null

  return (
    <Container>
      <Text>
        Current Session ID: {props.session.currentSession.session_id}
      </Text>
      <Heading>
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
      </Status>
    </Container >
  )
}

const Status = styled.div`
  padding: 30px 0;
`
const Container = styled.div`
  padding: 30px;
`


export default connect(mapStateToProps, mapDispatchToProps)(Question)
