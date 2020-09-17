import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { stopSection } from '../../actions/session'
import Loading from '../Shared/Loading'
import styled from 'styled-components'
import {
  Heading,
  Card,
  Text,
  Button
} from 'rebass'

const mapDispatchToProps = { stopSection }

const mapStateToProps = (state) => {
  return state
}

const Start = (props) => {

  if (props.session.isFetchingSession) return <Loading />
  if (!props.session.currentSection || !props.session.currentSession) return null

  return (
    <Container>
      <Card>
        <Heading>Section: {props.session.currentSection.name}</Heading>
        <Text>{props.session.currentSection.description}</Text>
        <br />
        <Text>{props.session.currentSection.question_order.length} questions</Text>
      </Card>
      <br />
      <Button
        onClick={() => {
          props.stopSection()
        }}
      >
        Start Section!
      </Button>
    </Container>
  )
}

const Container = styled.div`
  padding: 30px 0;
`


export default connect(mapStateToProps, mapDispatchToProps)(Start)
