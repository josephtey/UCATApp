import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { getExamDetail } from '../actions/content'
import styled from 'styled-components'
import {
  Heading,
  Card,
  Link,
  Text,
  Button
} from 'rebass'

const mapDispatchToProps = { getExamDetail }

const mapStateToProps = (state) => {
  return state
}

const Exam = (props) => {

  useEffect(() => {
    props.getExamDetail(props.match.params.structure_id)
  }, [])

  return (
    <Container>
      <Heading>

      </Heading>

      <ActionBar>
        <Button>Start Exam</Button>
      </ActionBar>

      <Sections>
        {props.content.examDetail && props.content.examDetail.sections.map((section, i) => (
          <Card style={{ marginBottom: '20px' }} key={i}>
            <Text>{section.name}</Text>
            <Text>{section.description}</Text>
            <Text>Number of questions: {section.question_order.length}</Text>
          </Card>
        ))}
      </Sections>
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
