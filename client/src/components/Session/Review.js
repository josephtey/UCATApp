import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { getSessionResponses, stopReview, getQuestionDetail, nextSection, finishSession } from '../../actions/session'
import BottomBar from '../Session/BottomBar'
import { Button } from '../Shared/Elements'
import Loading from '../Shared/Loading'
import styled from 'styled-components'
import {
  Text
} from 'rebass'
import { AiOutlineWarning } from "react-icons/ai"

const mapDispatchToProps = { getSessionResponses, stopReview, getQuestionDetail, nextSection, finishSession }

const mapStateToProps = (state) => {
  return state
}

const Review = (props) => {

  useEffect(() => {
    props.getSessionResponses(
      props.session.currentSession.session_id,
      "section",
      props.session.currentSection.section_id
    )
  }, [])

  if (props.session.isFetchingResponses) return <Loading duringSession={true} />
  if (!props.session.sessionResponses) return null

  return (
    <>
      <Container>
        <Title>Review</Title>

        <QuestionCards>
          {props.session.currentSection.question_order.map((question_id, i) => {
            const answered = props.session.sessionResponses.find(item => item.question_id === question_id)

            return (
              <Card key={i} onClick={() => {
                props.getQuestionDetail(question_id)
              }}>
                <Text>Question {i + 1}</Text>
                {!answered ? <AiOutlineWarning color="#f89800" size={20} /> : null}
              </Card>
            )
          })}
        </QuestionCards>
      </Container >
      <BottomBar
        leftContent={() => (
          <></>
        )}

        rightContent={() => (
          <>
            {props.session.currentSection.section_id !== props.session.currentStructure.section_order.slice(-1)[0]
              ?
              <Button
                type="primary"
                color="teal"
                label="Next Section"
                onClick={() => {
                  const currentSectionId = props.session.currentSection.section_id
                  const currentSectionIndex = props.session.currentStructure.section_order.indexOf(currentSectionId)
                  props.nextSection(
                    props.session.currentSession.session_id,
                    props.session.currentStructure.section_order[currentSectionIndex + 1]
                  )
                }}
              />
              :

              <Button
                onClick={() => {
                  props.finishSession(props.session.currentSession.session_id)
                }}
                type="primary"
                color="teal"
                label="Finish Exam"
              />
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
  padding: 30px 0;
`
const QuestionCards = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const Card = styled.div`
  background: white;
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

export default connect(mapStateToProps, mapDispatchToProps)(Review)
