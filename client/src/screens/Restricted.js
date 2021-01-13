import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { getAllExams } from '../actions/content'

import styled from 'styled-components'
const mapDispatchToProps = { getAllExams }

const mapStateToProps = (state) => {
  return state
}

const Restricted = (props) => {

  return (
    <Container>
      You don't have access to this application...
    </Container>
  )
}

const Container = styled.div`
  padding: 30px;
  margin-left: 340px;
`

export default connect(mapStateToProps, mapDispatchToProps)(Restricted)
