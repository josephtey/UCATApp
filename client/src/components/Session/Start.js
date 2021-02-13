import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { stopSectionStart } from '../../actions/session'
import Loading from '../Shared/Loading'
import BottomBar from '../Session/BottomBar'
import TopBarSecondary from '../Session/TopBarSecondary'
import styled from 'styled-components'
import { descriptions } from '../../constants/section_descriptions'

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
        {props.session.currentStructure.type === "Exam" || props.session.currentStructure.type === "Mock" ?
          <>
            <WelcomeMessage>
              <UCATLogo src="https://practice.ucat.ac.uk/img/logo.png" />
          UCAT PRACTICE TEST
        </WelcomeMessage>

            <Description>
              <DescriptionTitle>
                {props.session.currentSection.name}
              </DescriptionTitle>
              {descriptions[props.session.currentSection.name] ? descriptions[props.session.currentSection.name]() : null}
            </Description>

            <Info>
              In this section, you will have <b>{props.session.currentSection.time}</b> minutes to answer <b>{props.session.currentSection.question_order.length}</b> questions.
        </Info>

            <Warning>
              Once you start the timer, you cannot pause this section.
        </Warning>
          </>
          :
          <>
            <WelcomeMessage>
              <UCATLogo src="https://practice.ucat.ac.uk/img/logo.png" />
          UCAT PRACTICE
        </WelcomeMessage>

            <Description>
              <DescriptionTitle>
                {props.session.currentSection.name}
              </DescriptionTitle>
              {descriptions[props.session.currentSection.name] ? descriptions[props.session.currentSection.name]() : null}
            </Description>

            <Info>
              In this section, you will be tested on <b>{props.session.currentSection.question_order.length}</b> practice questions related to your selected topic.
        </Info>
          </>
        }
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
`

const WelcomeMessage = styled.div`
  font-family: arial;
  font-weight: bold;
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

const Description = styled.div`
  
`

const DescriptionTitle = styled.div`
  font-family: arial;
  font-weight: bold;
`


export default connect(mapStateToProps, mapDispatchToProps)(Start)
