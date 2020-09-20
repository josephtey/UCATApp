import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { stopSection } from '../../actions/session'
import Loading from '../Shared/Loading'
import BottomBar from '../Session/BottomBar'
import styled from 'styled-components'

const mapDispatchToProps = { stopSection }

const mapStateToProps = (state) => {
  return state
}

const Start = (props) => {

  if (props.session.isFetchingSession) return <Loading duringSession={true} />
  if (!props.session.currentSection || !props.session.currentSession) return null

  return (
    <>
      <Container>
        <WelcomeMessage>
          Welcome to {props.session.currentSection.name}
        </WelcomeMessage>

        <Info>
          This section has <b>{props.session.currentSection.question_order.length}</b> questions and is <b>25</b> minutes in total.
        </Info>

        <Warning>
          Once you start the timer, you cannot pause this section.
        </Warning>
      </Container>

      <BottomBar
        leftContent={()=>(
          <Link
              onClick={() => {
                props.returnHome();
              }}
            >I don't want to start this exam now</Link>
        )}
        
        rightContent={()=>(
          <Button
              onClick={() => {
                props.stopSection()
              }}
            >
          Start Section!
          </Button>
        )}

      />

    </>
  )
}

const Container = styled.div`
  padding: 30px 0;
  color: rgba(0,0,0,0.4)
`

const Button = styled.div`
  background: #2ecfb0;
  color: white;
  border-radius: 10px;
  padding: 10px 15px;
  font-family: Gilroy-SemiBold;
  cursor: pointer;
`

const WelcomeMessage = styled.div`
  font-family: Gilroy-Bold;
  text-transform: uppercase;
  padding-bottom: 20px;
`

const Info = styled.div`
  padding-bottom: 20px;
`

const Warning = styled.div`

`

const Link = styled.div`
  color: #f89800;
  cursor: pointer;
`


export default connect(mapStateToProps, mapDispatchToProps)(Start)
