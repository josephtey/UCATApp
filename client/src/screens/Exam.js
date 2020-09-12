import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import Sessions from '../components/Exam/Sessions'
import { getExamDetail, getStructureSessions, resetExamDetail } from '../actions/content'
import { createSession } from '../actions/session'
import styled from 'styled-components'
import {
  Heading,
  Card,
  Text,
  Button
} from 'rebass'
import Loading from '../components/Shared/Loading'
import { useDidMountEffect } from '../utils/helpers'

const mapDispatchToProps = { getExamDetail, resetExamDetail, createSession, getStructureSessions }

const mapStateToProps = (state) => {
  return state
}

const Exam = (props) => {

  useEffect(() => {
    props.getExamDetail(props.match.params.structure_id)
    props.getStructureSessions(props.match.params.structure_id)

    return () => {
      props.resetExamDetail()
    }

  }, [])

  useDidMountEffect(() => {
    props.history.push('/session/' + props.session.currentSession.session_id)
  }, [props.session.currentSession])

  if (props.content.isFetchingExamDetail) return <Loading />
  if (!props.content.examDetail) return null

  return (
    <Container>
      <Heading>
        {props.content.examDetail ? props.content.examDetail.details.name : null}
      </Heading>

      <ActionBar>
        <Button
          onClick={() => {
            props.createSession(props.content.examDetail.details.structure_id, 1)
          }}
        >Start Exam</Button>
      </ActionBar>

      <Sections>
        <Heading>
          Sections
        </Heading>
        {props.content.examDetail && props.content.examDetail.sections.map((section, i) => (
          <Card style={{ marginBottom: '20px' }} key={i}>
            <Text>{section.name}</Text>
            <Text>{section.description}</Text>
            <Text>Number of questions: {section.question_order.length}</Text>
          </Card>
        ))}
      </Sections>

      <Sessions />
    </Container>
  )
}

const Container = styled.div`
  padding: 30px;
`

const Sections = styled.div`
  padding: 20px 0;
`

const ActionBar = styled.div`
  padding: 20px 0;
`

export default connect(mapStateToProps, mapDispatchToProps)(Exam)
