import React from 'react';
import { Box } from 'rebass'
import styled from 'styled-components'
import LoadingGif from '../../assets/loading.gif'


const Loading = (props) => {
  return (
    <CenteredDiv>
      <img src={LoadingGif} />
    </CenteredDiv>
  )
}

const CenteredDiv = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -50px;
  margin-left: -100px;  
`

export default Loading