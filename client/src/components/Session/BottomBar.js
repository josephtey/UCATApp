import React from 'react'
import styled from 'styled-components'

const BottomBar = ({
  leftContent,
  rightContent
}) => {
  return (
    <Container>
      <BottomBarInner>
        <BottomBarLeft>
          {leftContent()}
        </BottomBarLeft>
        <BottomBarRight>
          {rightContent()}
        </BottomBarRight>
      </BottomBarInner>
    </Container>
  )
}

export default BottomBar

const Container = styled.div`
  box-shadow: -10px -10px 20px rgba(0,0,0, 0.02);
  background: #006daa;
  color: white;
  height: 40px;
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  z-index: 100;
`

const BottomBarInner = styled.div`
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`

const BottomBarLeft = styled.div`
  display: flex;
  align-items: center;
`

const BottomBarRight = styled.div`
  display: flex;
  align-items: center;
`