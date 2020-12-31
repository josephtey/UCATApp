import React from 'react'
import styled from 'styled-components'

const TopBarSecondary = ({
  leftContent,
  rightContent
}) => {
  return (
    <Container>
      <TopBarInner>
        <TopBarLeft>
          {leftContent()}
        </TopBarLeft>
        <TopBarRight>
          {rightContent()}
        </TopBarRight>
      </TopBarInner>
    </Container>
  )
}

export default TopBarSecondary

const Container = styled.div`
  background: #80aee1;
  color: white;
  height: 30px;
  width: 100%;
  top: 50px;
  overflow: hidden;
  position: fixed;
  z-index: 999;
  border-top: 3px solid white;
`

const TopBarInner = styled.div`
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`

const TopBarLeft = styled.div`
  display: flex;
  align-items: center;
`

const TopBarRight = styled.div`
  display: flex;
  align-items: center;
`