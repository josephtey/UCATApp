import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { getSessionResponses, stopReview, getQuestionDetail, nextSection, finishSession, reviewQuestions } from '../../actions/session'
import BottomBar from '../Session/BottomBar'
import TopBarSecondary from '../Session/TopBarSecondary'
import styled from 'styled-components'
import {
  Text
} from 'rebass'
import { RiFlag2Fill } from "react-icons/ri";
import { getIncompleteQuestions, filterResponses } from '../../utils/helpers'

const mapDispatchToProps = { getSessionResponses, stopReview, getQuestionDetail, nextSection, finishSession, reviewQuestions }

const mapStateToProps = (state) => {
  return state
}

const Review = (props) => {
  const incompleteQuestions = getIncompleteQuestions(props.session.currentSection.question_order, props.session.sessionResponses)
  const flaggedQuestions = filterResponses(props.session.sessionResponses, "flagged")

  useEffect(() => {
    props.reviewQuestions(props.session.currentSection.question_order)
  }, [])

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
        <Title>Review</Title>

        <QuestionCards>
          {props.session.currentSection.question_order.map((question_id, i) => {
            const answered = props.session.sessionResponses.find(item => item.question_id === question_id)

            return (
              <Card key={i} onClick={() => {
                props.getQuestionDetail(question_id)
              }}
                answered={answered && answered.value ? true : false}
                className="hvr-float"
              >
                <Text>Question {i + 1}</Text>
                {!answered ? null :
                  <>
                    {answered.flagged ?
                      <RiFlag2Fill color={
                        answered.value ? 'white' : '#f89800'
                      } size={20} />
                      :
                      null
                    }
                  </>
                }
              </Card>
            )
          })}
        </QuestionCards>
      </Container >
      <BottomBar
        leftContent={() => (
          <>
            {incompleteQuestions.length > 0 ?
              <LinkLeft
                onClick={() => {
                  props.reviewQuestions(incompleteQuestions)
                  props.getQuestionDetail(incompleteQuestions[0])
                }}
              >
                Review Incomplete
              </LinkLeft>
              : null}

            {flaggedQuestions.length > 0 ?
              <LinkLeft
                onClick={() => {
                  props.reviewQuestions(flaggedQuestions)
                  props.getQuestionDetail(flaggedQuestions[0])
                }}
              >
                Review Flagged
              </LinkLeft>
              : null}

            <LinkLeft
              onClick={() => {
                props.getQuestionDetail(props.session.currentSection.question_order[0])
              }}
            >
              Review All
              </LinkLeft>
          </>
        )}

        rightContent={() => (
          <>
            {props.session.currentSection.section_id !== props.session.currentStructure.section_order.slice(-1)[0]
              ?
              <LinkRight
                onClick={() => {
                  const currentSectionId = props.session.currentSection.section_id
                  const currentSectionIndex = props.session.currentStructure.section_order.indexOf(currentSectionId)
                  props.nextSection(
                    props.session.currentSession.session_id,
                    props.session.currentStructure.section_order[currentSectionIndex + 1]
                  )
                }}
              >
                Next Section
              </LinkRight>
              :

              <LinkRight
                onClick={() => {
                  props.finishSession(props.session.currentSession.session_id, props.session.currentStructure)
                }}
              >
                Finish Exam
              </LinkRight>
            }
          </>
        )}
      />
    </>
  )
}

const Title = styled.div`
  font-size: 20px;
  font-family: Gilroy-Bold;
  padding-bottom: 40px;
`
const Container = styled.div`
  padding: 30px;
`
const QuestionCards = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const Card = styled.div`
  background: ${props => props.answered ? '#2ecfb0' : 'white'};
  color: ${props => props.answered ? 'white' : 'black'};

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

export default connect(mapStateToProps, mapDispatchToProps)(Review)
