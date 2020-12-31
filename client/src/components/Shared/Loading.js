import React from 'react';
import styled from 'styled-components'
import Loader from 'react-loader-spinner'


const Loading = (props) => {
  return (
    <CenteredDiv
      duringSession={props.duringSession}
    >
      <Loader
        type="TailSpin"
        color={props.duringSession ? "#006daa" : "#2ecfb0"}
        height={100}
        width={100}
      />
    </CenteredDiv>
  )
}

const CenteredDiv = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -50px;
  margin-left: ${props => props.duringSession ? '-50px' : '50px'};
`

export default Loading