import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { getSessionResponses, getQuestionDetail, getSection, resetSection } from '../../actions/session'
import Loading from '../Shared/Loading'
import { Button } from '../Shared/Elements'
import styled from 'styled-components'
import {
  Text
} from 'rebass'
import { TiTick, TiTimes } from "react-icons/ti";
import BottomBar from './BottomBar'
import { getIncompleteQuestions, filterResponses } from '../../utils/helpers'

const mapDispatchToProps = { getSessionResponses, getQuestionDetail, getSection, resetSection }

const mapStateToProps = (state) => {
  return state
}

const Results = (props) => {

  useEffect(() => {
    props.getSessionResponses(props.session.currentSession.session_id, "structure")
    props.resetSection()
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
              <SectionBox
                key={i}
              >
                <SectionHeader>
                  <SectionTitle>
                    {section.name}
                  </SectionTitle>

                  <SectionScore>
                    {props.session.currentSession.score_breakdown[section.section_id.toString()]} Correct | {section.question_order.length - props.session.currentSession.score_breakdown[section.section_id.toString()]} Incorrect <br />
                    <br />
                    Raw Score: {props.session.currentSession.score_breakdown[section.section_id.toString() + "_score"]}  <br />
                    Scaled Score: {props.session.currentSession.score_breakdown[section.section_id.toString() + "_scaled"]}
                  </SectionScore>
                </SectionHeader>

                <SectionCards>
                  {section.question_order.map((question_id, j) => {
                    const response = props.session.sessionResponses.find(item => item.question_id === question_id)

                    return (
                      <Card
                        key={j}
                        correct={response && response.correct ? true : false}
                        onClick={() => {
                          props.getQuestionDetail(question_id, "answer")
                          props.getSection(section.section_id, section.question_order, question_id)
                        }}
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
              </SectionBox>
            )
          })}
        </Container>
        : <Loading duringSession={true} />}
      <BottomBar
        rightContent={() => (
          <>
            {/*
            <Button
              label="Review Incorrect"
              type="secondary"
              color="orange"
              onClick={props.returnHome}
            />
            <Button
              label="Review Flagged"
              type="secondary"
              color="orange"
              onClick={props.returnHome}
            />
            <Button
              label="Review All"
              type="secondary"
              color="orange"
              onClick={props.returnHome}
            />
            */}
          </>
        )}

        leftContent={() => (
          <>
            <Button
              label="Return Home"
              type="secondary"
              color="orange"
              onClick={props.returnHome}
            />
          </>
        )}
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

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const SectionScore = styled.div`
  opacity: 0.3;
  padding-bottom: 10px;
`

const SectionBox = styled.div`
`


export default connect(mapStateToProps, mapDispatchToProps)(Results)
