import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { getSectionDetail, resetSectionDetail } from '../actions/content'
import styled from 'styled-components'
import {
  Heading,
  Text,
  Button
} from 'rebass'

const mapDispatchToProps = { getSectionDetail, resetSectionDetail }

const mapStateToProps = (state) => {
  return state
}

const Exam = (props) => {

  useEffect(() => {
    props.getSectionDetail(props.match.params.section_id)

    return () => {
      props.resetSectionDetail()
    }
  }, [])

  return (
    <Container>
      {props.content.sectionDetail ?
        <>
          <Heading>
            {props.content.sectionDetail.details.name}
          </Heading>
          <Text>
            {props.content.sectionDetail.details.description}
          </Text>
          <Text>
            {props.content.sectionDetail.details.question_order.length} Questions
          </Text>
        </>
        : null}

      <Button
        onClick={() => {
          props.history.push(
            '/exam/' +
            props.match.params.structure_id + '/' +
            props.content.sectionDetail.details.section_id.toString() + '/' +
            props.content.sectionDetail.questions[0].question_id.toString()
          )
        }}
      >
        Start section!
      </Button>

    </Container>
  )
}

const Container = styled.div`
  padding: 30px;
`


export default connect(mapStateToProps, mapDispatchToProps)(Exam)
