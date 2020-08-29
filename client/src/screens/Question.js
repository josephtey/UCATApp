import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { getQuestionDetail, resetQuestionDetail, getSectionDetail } from '../actions/content'
import styled from 'styled-components'
import {
  Heading,
  Button,
  Text
} from 'rebass'

import { Label, Radio } from '@rebass/forms'


const mapDispatchToProps = { getQuestionDetail, getSectionDetail, resetQuestionDetail }

const mapStateToProps = (state) => {
  return state
}

const Question = (props) => {

  useEffect(() => {
    props.getSectionDetail(parseInt(props.match.params.section_id))
    props.getQuestionDetail(parseInt(props.match.params.question_id))

    return () => {
      props.resetQuestionDetail()
    }
  }, [])

  return (
    <Container>
      <Heading>
        {props.content.questionDetail ? props.content.questionDetail.question : null}
      </Heading>

      <Text>
        {props.content.questionDetail && props.content.questionDetail.options.map((option, i) => {
          return (
            <Label>
              <Radio
                name='question'
                value={option}
              />
              {option}
            </Label>
          )
        })}
      </Text>


      <Button
        onClick={() => {

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
