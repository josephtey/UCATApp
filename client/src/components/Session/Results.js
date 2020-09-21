import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { getSessionResponses } from '../../actions/session'
import Loading from '../Shared/Loading'
import { Button } from '../Shared/Elements'
import styled from 'styled-components'
import {
  Text
} from 'rebass'
import { TiTick, TiTimes } from "react-icons/ti";
import BottomBar from './BottomBar'

const mapDispatchToProps = { getSessionResponses }

const mapStateToProps = (state) => {
  return state
}

const Results = (props) => {

  useEffect(() => {
    props.getSessionResponses(props.session.currentSession.session_id, "structure")

    // return () => {
    //   props.stopSection()
    // }
  }, [])

  if (!props.session.allSections || !props.session.currentSession || !props.session.sessionResponses) return null

  return (
    <>
      {!props.session.isFetchingResponses ?
        <Container>
          <PreHeading>Results</PreHeading>
          {props.session.allSections.map((section, i) => {
            return (
              <>
                <SectionTitle
                  key={i}
                >
                  {section.name}
                </SectionTitle>

                <SectionCards>
                  {section.question_order.map((question_id, j) => {
                    const response = props.session.sessionResponses.find(item => item.question_id === question_id)

                    return (
                      <Card
                        key={j}
                        correct={response && response.correct ? true : false}
                      >
                        <Text>Question {j + 1}</Text>
                        {response && response.correct ?
                          <TiTick color="white" size={30} />
                          : <TiTimes color="#f89800" size={30} />
                        }
                      </Card>
                    )
                  })}
                </SectionCards>
              </>
            )
          })}
        </Container>
        : <Loading duringSession={true} />}
      <BottomBar
        rightContent={() => (
          <Button
            label="Return Home"
            type="secondary"
            color="orange"
            onClick={props.returnHome}
          />
        )}

        leftContent={() => (null)}
      />
    </>
  )
}

const PreHeading = styled.div`
  font-family: Gilroy-Regular;
  color: rgba(0,0,0,0.3);
  padding-bottom: 10px;
`

const Container = styled.div`
  padding: 30px 0;
`
const SectionTitle = styled.div`
  font-family: Gilroy-Bold;
  padding: 15px 0;
  font-size: 20px;
`

const SectionCards = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const Card = styled.div`
  background: ${props => props.correct ? '#2ecfb0' : 'white'};
  color: ${props => props.correct ? 'white' : 'black'};
  box-shadow: 10px 10px 20px rgba(0,0,0, 0.05);
  padding: 20px;
  border-radius: 15px;
  margin-right: 10px;
  margin-bottom: 10px;
  flex-basis: 28.5%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  &:nth-child(3n) {
    margin-right: 0;
  }
`


export default connect(mapStateToProps, mapDispatchToProps)(Results)
