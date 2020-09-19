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
        color="#2ecfb0"
        height={100}
        width={100}
        timeout={3000} //3 secs
      />
    </CenteredDiv>
  )
}

const CenteredDiv = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -50px;
  margin-left: ${props => props.duringSession ? '-100px' : '50px'};
`

export default Loading