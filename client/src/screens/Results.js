import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { getSectionDetail, resetSectionDetail } from '../actions/content'
import styled from 'styled-components'
import Loading from '../components/Shared/Loading'
import {
  Heading,
  Text,
  Button
} from 'rebass'

const mapDispatchToProps = { getSectionDetail, resetSectionDetail }

const mapStateToProps = (state) => {
  return state
}

const Results = (props) => {

  return (
    <Container>
      Scores
    </Container>
  )
}

const Container = styled.div`
  padding: 30px;
`


export default connect(mapStateToProps, mapDispatchToProps)(Results)
