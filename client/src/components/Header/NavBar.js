import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import LogoImage from '../../assets/in2medlogo.png'
import { connect } from 'react-redux'
import { eraseCookie } from '../../utils/helpers'
import { logoutUser } from '../../actions/auth'

const mapDispatchToProps = { logoutUser }

const mapStateToProps = (state) => {
  return state
}

const NavBar = (props) => {

  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (props.location.pathname.includes("session")) {
      setVisible(false)
    } else {
      setVisible(true)
    }
  }, [props.location.pathname])

  if (!visible || !props.auth.userData) return null

  return (
    <Container>
      <Logo>
        <img src={LogoImage} width={150} />
      </Logo>

      <UserInfo>
        <span style={{ 'opacity': '0.7' }}>Welcome,</span>
        <span style={{ 'font-size': '20px', 'font-weight': 'bold' }}>{props.auth.userData.username}</span>
        <span
          style={{ 'opacity': '0.7', 'text-align': 'right', 'width': '100%', 'cursor': 'pointer' }}
          onClick={() => {
            props.logoutUser()
            props.setAuthenticated(false)
          }}
        >
          Log Out
        </span>
      </UserInfo>

      <Nav>
        <NavItem
          active={props.location.pathname === "/" || props.location.pathname.includes("exam")}
          onClick={() => {
            props.history.push('/')
          }}
        >
          Full Exams
        </NavItem>
        <NavItem
          active={props.location.pathname.includes("mocks")}
          onClick={() => {
            props.history.push('/mocks')
          }}
        >
          Section Mocks
        </NavItem>
        <NavItem
          active={props.location.pathname.includes("practice")}
          onClick={() => {
            props.history.push('/practice')
          }}
        >
          Practice
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
  display: flex;
  flex-direction: column
`

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)