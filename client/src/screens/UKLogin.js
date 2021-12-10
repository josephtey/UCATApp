import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { loginUK } from '../actions/auth'
import styled from 'styled-components'
import Logo from '../assets/in2medlogo.png'
import UKLoginLogo from '../assets/in2meduk.svg'
import { Button } from '../components/Shared/Elements'
import Loading from '../components/Shared/Loading'

const mapDispatchToProps = { loginUK }
const mapStateToProps = (state) => {
  return state
}

const UKLogin = (props) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    if (props.auth.userData) {
      props.setAuthenticated(true)
      setLoading(false)
    }
  }, [props.auth.userData])

  return (
    <Container>

      <LoginLogo src={UKLoginLogo} />
      {loading ?
        <LoadingContainer>
          <Loading
            duringSession={true}
            customColor={"#1B5B63"}
          />
        </LoadingContainer>
        :
        <>
          {
            props.auth.error ?
              <ErrorMessage>
                {props.auth.error}
              </ErrorMessage>
              :
              null
          }

          <LoginBox>
            <input type="text" value={username} placeholder='Email' onChange={e => {
              setUsername(e.target.value)
            }} />
            <input type="password" value={password} placeholder='Password' onChange={e => {
              setPassword(e.target.value)
            }} />
            <span
              style={{
                "align-self": "flex-end"
              }}
            >
              <ButtonPrimary
                type="primary"
                color={"#1A515F"}
                onClick={async () => {
                  setLoading(true)

                  await props.loginUK(username, password);

                  setLoading(false);
                }}
              >
                Login
              </ButtonPrimary>
            </span>
          </LoginBox>

          <LoginLogoSmaller
            onClick={() => {
              props.history.push('/')
            }}
            src={Logo}
          />
        </>
      }

    </Container>
  )
}

const LoginLogoSmaller = styled.img`
  width: 70px;
  opacity: 0.5;
  display: flex;
  margin: 25px 0;
  filter: grayscale(1);
  cursor: pointer;
  transition: all ease 1s;

  &:hover {
    filter: grayscale(0.5);
    transition: all ease 1s;
  }
`

const LoadingContainer = styled.div`
  margin: 70px 0;
`
const LoginLogo = styled.img`
  width: 125px;
  margin-bottom: 40px;
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
  margin-top: 20px;
`

const ErrorMessage = styled.div`
  color: red;
  padding: 20px;
`

const ButtonPrimary = styled.div`
  background: ${props => props.color};
  color: white;
  border-radius: 10px;
  padding: 10px 15px;
  font-family: Gilroy-SemiBold;
  cursor: pointer;
`

export default connect(mapStateToProps, mapDispatchToProps)(UKLogin)
