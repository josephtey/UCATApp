import React from 'react';
import { Box } from 'rebass'
import styled from 'styled-components'
import LoadingGif from '../../assets/loading.gif'
import Loader from 'react-loader-spinner'


const Loading = (props) => {
  return (
    <CenteredDiv>
      <Loader
        type="TailSpin"
        color="#5843BE"
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
  margin-left: 50px;  
`

export default Loading