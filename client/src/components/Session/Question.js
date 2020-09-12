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


const mapDispatchToProps = { getQuestionDetail, createResponse }

const mapStateToProps = (state) => {
  return state
}

const Question = (props) => {

  const [selectedAnswer, setSelectedAnswer] = useState(null)

  useEffect(() => {
    setSelectedAnswer(null)


    props.getQuestionDetail(props.session.currentSection.question_order[0])

  }, [])

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
          // const currentQuestionIndex = props.content.sectionDetail.details.question_order.indexOf(parseInt(props.match.params.question_id))
          // const nextQuestion = props.content.sectionDetail.details.question_order[currentQuestionIndex + 1]

          // props.createResponse(props.session.currentSession.session_id, parseInt(props.match.params.question_id), 1, parseInt(props.match.params.section_id), selectedAnswer)
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
  padding: 30px 0;
`


export default connect(mapStateToProps, mapDispatchToProps)(Question)
