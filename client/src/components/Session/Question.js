import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { getQuestionDetail, createResponse, reviewSection, getSessionResponses, flagResponse } from '../../actions/session'
import Loading from '../Shared/Loading'
import styled from 'styled-components'
import BottomBar from '../Session/BottomBar'
import { Button, LinkItem, RadioBox, FlagButton } from '../Shared/Elements'
import { useDidMountEffect } from '../../utils/helpers';


const mapDispatchToProps = { getQuestionDetail, createResponse, reviewSection, getSessionResponses, flagResponse }

const mapStateToProps = (state) => {
  return state
}

const Question = (props) => {

  useDidMountEffect(() => {
    props.getSessionResponses(
      props.session.currentSession.session_id,
      "section",
      props.session.currentSection.section_id
    )
  }, [props.session.newResponse])

  if (!props.session.currentQuestion) return null

  return (
    <>
      {!props.session.isFetchingQuestionDetail ?
        <Container>
          <PreHeading>
            <PreHeadingLeft>
              Question {props.session.currentSection.question_order.indexOf(props.session.currentQuestion.question_id) + 1} of {props.session.currentSection.question_order.length}
            </PreHeadingLeft>
            <PreHeadingRight>
              <FlagButton
                flagged={
                  props.session.sessionResponses.find(item => item.question_id === props.session.currentQuestion.question_id) ?
                    props.session.sessionResponses.find(item => item.question_id === props.session.currentQuestion.question_id).flagged
                    : false}

                action={(flagged) => {
                  props.flagResponse(
                    props.session.currentSession.session_id,
                    props.session.currentQuestion.question_id,
                    1,
                    props.session.currentSection.section_id,
                    flagged
                  )
                }}
              />
            </PreHeadingRight>
          </PreHeading>
          <Title>
            {props.session.currentQuestion.question}
          </Title>

          <RadioBox
            options={props.session.currentQuestion.options}
            onClick={(item) => {
              props.createResponse(
                props.session.currentSession.session_id,
                props.session.currentQuestion.question_id,
                1,
                props.session.currentSection.section_id,
                item,
                props.session.currentQuestion.answer
              )
            }}
            defaultValue={() => {
              const response = props.session.sessionResponses.find(
                item => item.question_id === props.session.currentQuestion.question_id
              )

              if (response) {
                return response.value
              } else {
                return null
              }

            }}
          />

        </Container >
        : <Loading duringSession={true} />
      }
      <BottomBar
        leftContent={() => (
          <>
            {props.session.currentQuestion.question_id !== props.session.currentSection.question_order.slice(-1)[0] ?
              <Button
                onClick={() => {
                  props.reviewSection()
                }}
                type="secondary"
                label="Review"
                color="orange"
              />
              : null}
          </>
        )}

        rightContent={() => (
          <>
            {props.session.currentQuestion.question_id !== props.session.currentSection.question_order[0] ?
              <LinkItem
                color="teal"
                onClick={() => {
                  const currentQuestionId = props.session.currentQuestion.question_id
                  const currentQuestionIndex = props.session.currentSection.question_order.indexOf(currentQuestionId)
                  const nextQuestion = props.session.currentSection.question_order[currentQuestionIndex - 1]
                  props.getQuestionDetail(nextQuestion)
                }}
              >
                Previous Question
              </LinkItem>
              : null}

            {props.session.currentQuestion.question_id !== props.session.currentSection.question_order.slice(-1)[0] ?
              <Button
                type="primary"
                label="Next Question"
                color="teal"
                onClick={() => {
                  const currentQuestionId = props.session.currentQuestion.question_id
                  const currentQuestionIndex = props.session.currentSection.question_order.indexOf(currentQuestionId)
                  const nextQuestion = props.session.currentSection.question_order[currentQuestionIndex + 1]
                  props.getQuestionDetail(nextQuestion)
                }}
              />
              :
              <Button
                onClick={() => {
                  props.reviewSection()
                }}
                type="secondary"
                label="Review"
                color="orange"
              />}
          </>
        )}
      />

    </>
  )
}


const Container = styled.div`
  padding: 30px 0;
`

const Title = styled.div`
  font-family: Gilroy-Bold;
  font-size: 25px;
  padding-bottom: 30px;
`

const PreHeading = styled.div`
  font-family: Gilroy-Regular;
  color: rgba(0,0,0,0.3);
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between
`

const PreHeadingRight = styled.div`

`
const PreHeadingLeft = styled.div`

`

export default connect(mapStateToProps, mapDispatchToProps)(Question)
