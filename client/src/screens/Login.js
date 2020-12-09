import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { initUser } from '../actions/auth'
import styled from 'styled-components'
import Logo from '../assets/in2medlogo.png'
import { Button } from '../components/Shared/Elements'
import Loading from '../components/Shared/Loading'

const mapDispatchToProps = { initUser }
const mapStateToProps = (state) => {
  return state
}

const Login = (props) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (props.auth.userData) {
      props.setAuthenticated(true)
      setLoading(false)
    }
  }, [props.auth.userData])

  useEffect(() => {
    setLoading(false)
  }, [props.auth.error])

  return (
    <Container>
      <LoginLogo src={Logo} />
      {loading ?
        <LoadingContainer>
          <Loading
            duringSession={true}
          />
        </LoadingContainer>
        :
        <>
          {
            props.auth.error ?
              <ErrorMessage>
                {props.auth.error}
              </ErrorMessage>
              : null
          }

          <LoginBox>
            <input type="text" placeholder='Email' onChange={e => {
              setUsername(e.target.value)
            }} />
            <input type="password" placeholder='Password' onChange={e => {
              setPassword(e.target.value)
            }} />
            <span
              style={{
                "align-self": "flex-end"
              }}
            >
              <Button
                type="primary"
                color="orange"
                label="Login"
                onClick={() => {
                  setLoading(true)
                  props.initUser(username, password)
                }}
              />
            </span>
          </LoginBox>
        </>
      }

    </Container>
  )
}
const LoadingContainer = styled.div`
  margin: 70px 0;
`
const LoginLogo = styled.img`
  width: 150px;
  margin-bottom: 20px;
`
const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: white;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 10px 10px 20px rgba(0,0,0, 0.05);

  input {
    margin-bottom: 10px;
    font-size: 15px;
    width: 300px;
    border-radius: 5px;
    border: 1px solid #eeeeee;
    padding: 10px;
    font-family: Gilroy-Regular;
  }

`

const Container = styled.div`
  width: 100%;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const ErrorMessage = styled.div`
  color: red;
  padding: 20px;
`

export default connect(mapStateToProps, mapDispatchToProps)(Login)
