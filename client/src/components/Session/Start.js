import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { stopSectionStart } from '../../actions/session'
import Loading from '../Shared/Loading'
import BottomBar from '../Session/BottomBar'
import TopBarSecondary from '../Session/TopBarSecondary'
import styled from 'styled-components'

const mapDispatchToProps = { stopSectionStart }

const mapStateToProps = (state) => {
  return state
}

const Start = (props) => {

  if (props.session.isFetchingSession) return <Loading duringSession={true} />
  if (!props.session.currentSection || !props.session.currentSession) return null

  return (
    <>
      <TopBarSecondary
        leftContent={() => {
          return null
        }}
        rightContent={() => {
          return null
        }}
      />
      <Container>
        <WelcomeMessage>
          <UCATLogo src="https://practice.ucat.ac.uk/img/logo.png" />
          UCAT PRACTICE TEST
        </WelcomeMessage>

        <Info>
          This section has <b>{props.session.currentSection.question_order.length}</b> questions and is <b>{props.session.currentSection.time}</b> minutes in total.
        </Info>

        <Warning>
          Once you start the timer, you cannot pause this section.
        </Warning>
      </Container>

      <BottomBar
        leftContent={() => (
          <LinkLeft
            onClick={() => {
              props.returnHome();
            }}
          >I don't want to start this section now
          </LinkLeft>
        )}

        rightContent={() => (
          <LinkRight
            onClick={() => {
              props.stopSectionStart(props.session.currentSession.session_id)
            }}
          >
            Start Section
          </LinkRight>
        )}

      />

    </>
  )
}

const Container = styled.div`
  padding: 30px;
  color: rgba(0,0,0,0.4)
`

const WelcomeMessage = styled.div`
  font-family: Gilroy-Bold;
  text-transform: uppercase;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const UCATLogo = styled.img`
  width: 250px;
  margin-bottom: 20px;
`

const Info = styled.div`
  padding-bottom: 20px;
`

const Warning = styled.div`

`

const LinkLeft = styled.div`
  color: white;
  cursor: pointer;
  border-right: 2px solid white;
  height: 100%;
  padding: 15px;
`

const LinkRight = styled.div`
  color: white;
  cursor: pointer;
  border-left: 2px solid white;
  height: 100%;
  padding: 15px;
`


export default connect(mapStateToProps, mapDispatchToProps)(Start)
