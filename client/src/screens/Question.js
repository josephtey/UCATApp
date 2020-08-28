import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { getQuestionDetail, resetQuestionDetail, getSectionDetail } from '../actions/content'
import styled from 'styled-components'
import {
  Heading,
  Button
} from 'rebass'

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

      <Button
        onClick={() => {

        }}
      >
        Next Question
      </Button>
    </Container >
  )
}

const Container = styled.div`
  padding: 30px;
`


export default connect(mapStateToProps, mapDispatchToProps)(Question)
