import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Button } from '../components/Shared/Elements'
import Loading from '../components/Shared/Loading'

const mapDispatchToProps = {}
const mapStateToProps = (state) => {
  return state
}

const Dashboard = (props) => {

  return (
    <Container>

      Dashboard

    </Container>
  )
}

const Container = styled.div`
  padding: 30px;
  margin-left: 340px;
`

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
