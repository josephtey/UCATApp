import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { getSectionDetail } from '../actions/content'
import styled from 'styled-components'
import {
  Heading,
  Text,
  Button
} from 'rebass'

const mapDispatchToProps = { getSectionDetail }

const mapStateToProps = (state) => {
  return state
}

const Exam = (props) => {

  useEffect(() => {
    props.getSectionDetail(props.match.params.section_id)
  }, [])

  return (
    <Container>
      <Heading>
        {props.content.sectionDetail ? props.content.sectionDetail.details.name : null}
      </Heading>
      <Text>
        {props.content.sectionDetail ? props.content.sectionDetail.details.description : null}
      </Text>
      <Button>
        Start section!
      </Button>

    </Container>
  )
}

const Container = styled.div`
  padding: 30px;
`


export default connect(mapStateToProps, mapDispatchToProps)(Exam)
