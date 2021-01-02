import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { getSessionResponses, stopReview, getQuestionDetail, nextSection, finishSession, reviewQuestions } from '../../actions/session'
import BottomBar from '../Session/BottomBar'
import TopBarSecondary from '../Session/TopBarSecondary'
import styled from 'styled-components'
import { getIncompleteQuestions, filterResponses } from '../../utils/helpers'
import ReviewCards from './ReviewCards'

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
        <Title>{props.session.currentSection.name} Review Screen</Title>

        <Description>
          <p>Below is a summary of your answers. You can review your questions in three (3) different ways.</p>

          <p>The buttons in the lower right-hand corner correspond to these choices:</p>
          <p>
            1. Review all of your questions and answers.
          </p>
          <p>
            2. Review questions that are incomplete.
          </p>
          <p>
            3. Review questions that are flagged for review. (Click the 'flag' icon to change the flag for review status.)
          </p>

          <p>
            You may also click on a question number to link directly to its location in the exam.
          </p>

        </Description>

        <ReviewCards
          section={props.session.currentSection}
          responses={props.session.sessionResponses}
          onClick={(question_id) => {
            props.getQuestionDetail(question_id)
          }}
          mode="Review"
        />
      </Container >
      <BottomBar
        rightContent={() => (
          <>
            {incompleteQuestions.length > 0 ?
              <LinkRight
                onClick={() => {
                  props.reviewQuestions(incompleteQuestions)
                  props.getQuestionDetail(incompleteQuestions[0])
                }}
              >
                Review Incomplete
              </LinkRight>
              : null}

            {flaggedQuestions.length > 0 ?
              <LinkRight
                onClick={() => {
                  props.reviewQuestions(flaggedQuestions)
                  props.getQuestionDetail(flaggedQuestions[0])
                }}
              >
                Review Flagged
              </LinkRight>
              : null}

            <LinkRight
              onClick={() => {
                props.getQuestionDetail(props.session.currentSection.question_order[0])
              }}
            >
              Review All
              </LinkRight>
          </>
        )}

        leftContent={() => (
          <>
            {props.session.currentSection.section_id !== props.session.currentStructure.section_order.slice(-1)[0]
              ?
              <LinkLeft
                onClick={() => {
                  const currentSectionId = props.session.currentSection.section_id
                  const currentSectionIndex = props.session.currentStructure.section_order.indexOf(currentSectionId)
                  props.nextSection(
                    props.session.currentSession.session_id,
                    props.session.currentStructure.section_order[currentSectionIndex + 1]
                  )
                }}
              >
                End Review
              </LinkLeft>
              :

              <LinkLeft
                onClick={() => {
                  props.finishSession(props.session.currentSession.session_id, props.session.currentStructure)
                }}
              >
                Finish Exam
              </LinkLeft>
            }
          </>
        )}
      />
    </>
  )
}

const Description = styled.div`
  margin: 40px 0;
`

const Title = styled.div`
  font-size: 20px;
  font-family: Gilroy-Bold;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Container = styled.div`
  padding: 30px;
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
