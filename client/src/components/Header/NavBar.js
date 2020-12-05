import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import LogoImage from '../../assets/in2medlogo.png'

const NavBar = (props) => {

  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (props.location.pathname.includes("session")) {
      setVisible(false)
    } else {
      setVisible(true)
    }
  }, [props.location.pathname])

  if (!visible) return null

  return (
    <Container>
      <Logo>
        <img src={LogoImage} width={150} />
      </Logo>

      <UserInfo>
        <span style={{ 'opacity': '0.7' }}>Welcome,</span>
        <br />
        <span style={{ 'font-size': '20px', 'font-weight': 'bold' }}>Joseph Tey</span>
      </UserInfo>

      <Nav>
        <NavItem
          active={true}
          onClick={() => {
            props.history.push('/')
          }}
        >
          Exams
        </NavItem>
        <NavItem
          active={false}
        >
          Statistics
        </NavItem>
      </Nav>
    </Container>
  )
}

const NavItem = styled.div`
  border-radius: 15px;
  background: ${props => props.active ? '#2ecfb0' : 'white'};
  color: ${props => props.active ? 'white' : 'rgba(0, 0, 0, 0.5)'};
  padding: 13px 20px;
  margin-bottom: 15px;
  cursor: pointer;
  box-shadow: ${props => props.active ? '5px 5px 10px rgba(0,0,0, 0.1);' : 'none'}

`
const Nav = styled.div`
  padding: 40px;
`
const Logo = styled.div`
  margin: 20px 0;
  text-align: center;
  font-family: Gilroy-Bold;
`

const Container = styled.div`
  position: fixed;
  height: 100%;
  background: white;
  width: 320px;
`

const UserInfo = styled.div`
  background: #2ECFAF;
  padding: 40px;
  color: white;
`

export default NavBar