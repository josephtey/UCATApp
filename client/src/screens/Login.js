import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { initUser, initGeneralUser, loginGeneralUser } from '../actions/auth'
import styled from 'styled-components'
import Logo from '../assets/in2medlogo.png'
import KIS_Logo from '../assets/kislogo.png'
import { Button } from '../components/Shared/Elements'
import Loading from '../components/Shared/Loading'

const mapDispatchToProps = { initUser, initGeneralUser, loginGeneralUser }
const mapStateToProps = (state) => {
  return state
}


const Login = (props) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [loading, setLoading] = useState(false)
  const [userbase, setUserbase] = useState("In2Med")
  const [error, setError] = useState(null)
  const [emailedDisabled, setEmailDisabled] = useState(false)

  const clearForm = () => {
    setUsername("")
    setPassword("")
    setConfirmPassword("")
  }

  useEffect(() => {
    const pathName = props.location.pathname
    const urlParams = new URLSearchParams(props.location.search);


    if (pathName == "/kis") {
      setUserbase("KIS_onboard")

      if (urlParams.has('email')) {
        setUsername(urlParams.get('email'))
        setEmailDisabled(true)
      }
    }
  }, [])
  useEffect(() => {
    if (props.auth.userData) {
      props.setAuthenticated(true)
      setLoading(false)
    }
  }, [props.auth.userData])

  return (
    <Container>
      {userbase === "In2Med" ?
        <LoginLogo src={Logo} />
        : userbase === "KIS" || userbase === "KIS_onboard" ?
          <KISLogo
            src={KIS_Logo}
          />
          : null
      }
      {loading ?
        <LoadingContainer>
          <Loading
            duringSession={true}
            customColor={userbase === "In2Med" ? '#f89800' : userbase === "KIS" || userbase === "KIS_onboard" ? "#200CAA" : "#f89800"}
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

          {
            userbase === "KIS_onboard" ?

              <LoginBox>
                <input type="text" value={username} disabled={emailedDisabled} placeholder='Email used for KIS' onChange={e => {
                  setUsername(e.target.value)
                }} />
                <input type="password" value={password} placeholder='New Password' onChange={e => {
                  setPassword(e.target.value)
                }} />
                <input type="password" value={confirmPassword} placeholder='Confirm Password' onChange={e => {
                  setConfirmPassword(e.target.value)
                }} />
                <>
                  {error ?
                    <ErrorMessage>
                      {error}
                    </ErrorMessage>
                    :
                    null
                  }
                </>
                <span
                  style={{
                    "align-self": "flex-end"
                  }}
                >
                  <Button
                    type="primary"
                    color="blue"
                    label="Generate Account"
                    onClick={async () => {
                      setLoading(true)

                      if (password === confirmPassword) {
                        setError(null)
                        await props.initGeneralUser(username, password, "KIS")
                      } else {
                        setError("Passwords do not match!")
                      }
                      setLoading(false)
                    }}
                  />
                </span>
              </LoginBox>

              :

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
                  <Button
                    type="primary"
                    color={userbase === "In2Med" ? "orange" : userbase === "KIS" ? "blue" : "orange"}
                    label="Login"
                    onClick={async () => {
                      setLoading(true)

                      if (userbase === "In2Med") {
                        await props.initUser(username, password)
                      } else if (userbase === "KIS") {
                        await props.loginGeneralUser(username, password)
                      }
                      setLoading(false)
                    }}
                  />
                </span>
              </LoginBox>
          }


          {userbase === "In2Med" ?
            <LoginSubtext>
              Welcome to the UCAT Question Bank! <br /><br /> Login with the same email and password you used for your <b>in2med.com.au</b> account.
            <br /><br /><br />
              <KIS
                onClick={() => {
                  setUserbase("KIS")
                  clearForm()
                }}
              > If you are a <b>KIS</b> customer, click here to login!</KIS>
            </LoginSubtext>
            : userbase === "KIS" ?
              <LoginBottom>
                <LoginSubtext
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setUserbase("In2Med")
                    clearForm()
                  }}
                >
                  Back to In2Med login
              </LoginSubtext>

                <LoginSubtext
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setUserbase("KIS_onboard")
                    clearForm()
                  }}
                >
                  Setup Account
              </LoginSubtext>
              </LoginBottom>
              : userbase === "KIS_onboard" ?
                <LoginSubtext
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setUserbase("KIS")
                    clearForm()
                  }}
                >
                  Return back to KIS login
              </LoginSubtext>
                : null}
        </>
      }

    </Container>
  )
}

const KIS = styled.span`
  background: #200CAA;
  color: white;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
`
const LoginSubtext = styled.div`
  color: grey;
  width: 500px;
  margin-top: 30px;
  text-align: center;
`

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
  margin-top: 20px;
`

const ErrorMessage = styled.div`
  color: red;
  padding: 20px;
`
const KISLogo = styled.img`
  background: #200CAA;
  width: 100px;
  padding: 15px;
  border-radius: 15px;
  margin-bottom: 45px;
`

const LoginBottom = styled.div`
  display: flex;
  flex-direction: column;
`

export default connect(mapStateToProps, mapDispatchToProps)(Login)
