import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { getSessionResponses, stopReview, getQuestionDetail } from '../../actions/session'
import Loading from '../Shared/Loading'
import styled from 'styled-components'
import {
  Heading,
  Card,
  Text,
  Button
} from 'rebass'

const mapDispatchToProps = { getSessionResponses, stopReview, getQuestionDetail }

const mapStateToProps = (state) => {
  return state
}

const Review = (props) => {

  useEffect(() => {
    props.getSessionResponses(
      props.session.currentSession.session_id,
      "section",
      props.session.currentSection.section_id
    )

    return () => {
      props.stopReview()
    }
  }, [])

  return (
    <Container>
      <Heading>Review Section</Heading>

      {props.session.currentSection.question_order.map((question_id, i) => {
        const answered = props.session.sessionResponses.find(item => item.question_id === question_id)

        return (
          <Card style={{ margin: '15px 0' }} key={i}>
            <Text>Question {i + 1}</Text>
            {answered ? <Text><b>Answered</b></Text> : null}
            <Button onClick={() => {
              props.getQuestionDetail(question_id)
            }}>
              View
            </Button>
          </Card>
        )
      })}

      <Button>
        Next Section
      </Button>
    </Container >
  )
}

const Container = styled.div`
  padding: 30px 0;
`


export default connect(mapStateToProps, mapDispatchToProps)(Review)
