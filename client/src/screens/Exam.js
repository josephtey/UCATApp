import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { getExamDetail, resetExamDetail, createSession, getStructureSessions } from '../actions/content'
import styled from 'styled-components'
import {
  Heading,
  Card,
  Link,
  Text,
  Button
} from 'rebass'

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

  return (
    <Container>
      <Heading>
        {props.content.examDetail ? props.content.examDetail.details.name : null}
      </Heading>

      <ActionBar>
        <Button
          onClick={() => {
            props.createSession(props.content.examDetail.details.structure_id, 1)
            props.history.push('/exam/' + props.match.params.structure_id + '/' + props.content.examDetail.sections[0].section_id.toString())
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

      <Sessions>
        <Heading>
          Sessions
        </Heading>
        {props.content.structureSessions && props.content.structureSessions.map((session, i) => (
          <Card style={{ marginBottom: '20px' }} key={i}>
            <Text>{session.session_id}</Text>
          </Card>
        ))}
      </Sessions>


    </Container>
  )
}

const Container = styled.div`
  padding: 30px;
`

const Sections = styled.div`
  padding: 20px 0;
`

const Sessions = styled.div`
  padding: 20px 0;
`

const ActionBar = styled.div`
  padding: 20px 0;
`

export default connect(mapStateToProps, mapDispatchToProps)(Exam)
