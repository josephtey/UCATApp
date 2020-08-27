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
      <Heading>
        {props.content.sectionDetail ? props.content.sectionDetail.details.name : null}
      </Heading>
      <Text>
        {props.content.sectionDetail ? props.content.sectionDetail.details.description : null}
      </Text>
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
