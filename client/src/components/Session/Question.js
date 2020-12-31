import React from 'react';
import { connect } from 'react-redux'
import { getQuestionDetail, createResponse, reviewSection, getSessionResponses, flagResponse } from '../../actions/session'
import Loading from '../Shared/Loading'
import styled from 'styled-components'
import BottomBar from '../Session/BottomBar'
import TopBarSecondary from '../Session/TopBarSecondary'
import { RadioBox, FlagButton, DragAndDrop } from '../Shared/Elements'
import { useDidMountEffect } from '../../utils/helpers';
import { BiCalculator, BiBook } from "react-icons/bi";



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
      <TopBarSecondary
        leftContent={() => {
          return (
            <>
              <TopLink>
                <BiCalculator color="white" size={20} /> Calculator
              </TopLink>
              <TopLink>
                <BiBook color="white" size={20} /> Scratch Pad
              </TopLink>
            </>
          )
        }}
        rightContent={() => {
          return (
            <>
              <TopLink>
                <FlagButton
                  flagged={
                    props.session.sessionResponses.find(item => item.question_id === props.session.currentQuestion.question_id) ?
                      props.session.sessionResponses.find(item => item.question_id === props.session.currentQuestion.question_id).flagged
                      : false}

                  action={(flagged) => {
                    props.flagResponse(
                      props.session.currentSession.session_id,
                      props.session.currentQuestion.question_id,
                      props.auth.userData.student_id,
                      props.session.currentSection.section_id,
                      flagged
                    )
                  }}
                />
                Flag for Review
              </TopLink>
              <TopLink>
                Question {props.session.currentQuestionOrder.indexOf(props.session.currentQuestion.question_id) + 1} of {props.session.currentQuestionOrder.length}
              </TopLink>
            </>
          )
        }}
      />
      {!props.session.isFetchingQuestionDetail ?
        <Container>
          <MainContent>
            {props.session.currentStem ?
              <QuestionStem>
                {props.session.currentStem.text ?
                  <QuestionStemText>
                    {props.session.currentStem.text.split("<br/>").map((para) => {
                      return (
                        <>
                          {para} <br />
                        </>
                      )
                    })}
                  </QuestionStemText>
                  : null}
                <QuestionStemImage src={props.session.currentStem.image} />
              </QuestionStem>
              : null}
            <QuestionContent>
              {props.session.currentQuestion.question ?
                <Text>
                  {props.session.currentQuestion.question}
                </Text>
                : null}

              {props.session.currentQuestion.image ?
                <QuestionImage src={props.session.currentQuestion.image} />
                : null}

              {props.session.currentQuestion.type === "MC" ?
                <RadioBox
                  options={props.session.currentQuestion.options}
                  images={props.session.currentQuestion.option_images}
                  onClick={(item) => {
                    props.createResponse(
                      props.session.currentSession.session_id,
                      props.session.currentQuestion.question_id,
                      props.auth.userData.student_id,
                      props.session.currentSection.section_id,
                      item,
                      props.session.currentQuestion.answer,
                      props.session.currentQuestion.type,
                      props.session.currentStem ? props.session.currentStem.stem_id : null
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
                : props.session.currentQuestion.type === "DD" ?
                  <DragAndDrop
                    options={props.session.currentQuestion.options}
                    onClick={(item) => {
                      props.createResponse(
                        props.session.currentSession.session_id,
                        props.session.currentQuestion.question_id,
                        props.auth.userData.student_id,
                        props.session.currentSection.section_id,
                        item,
                        props.session.currentQuestion.answer,
                        props.session.currentQuestion.type,
                        props.session.currentStem ? props.session.currentStem.stem_id : null
                      )
                    }}
                    defaultValue={() => {
                      const response = props.session.sessionResponses.find(
                        item => item.question_id === props.session.currentQuestion.question_id
                      )
                      if (response && response.value && response.value.split(";").length > 0) {
                        return response.value.split(";")
                      } else {
                        return null
                      }
                    }}
                  />
                  : null}
            </QuestionContent>
          </MainContent>

        </Container >
        : <Loading duringSession={true} />
      }
      <BottomBar
        leftContent={() => (
          <>
            <LinkLeft
              onClick={() => {

              }}
            >
              End Exam
            </LinkLeft>
            <LinkLeft
              onClick={() => {
                props.reviewSection()
              }}
            >
              Review Screen
            </LinkLeft>
          </>
        )}

        rightContent={() => (
          <>
            {props.session.currentQuestion.question_id !== props.session.currentQuestionOrder[0] ?
              <LinkRight
                onClick={() => {
                  const currentQuestionId = props.session.currentQuestion.question_id
                  const currentQuestionIndex = props.session.currentQuestionOrder.indexOf(currentQuestionId)
                  const nextQuestion = props.session.currentQuestionOrder[currentQuestionIndex - 1]
                  props.getQuestionDetail(nextQuestion)
                }}
              >
                Previous
              </LinkRight>
              : null}

            {props.session.currentQuestion.question_id !== props.session.currentQuestionOrder.slice(-1)[0] ?
              <LinkRight
                onClick={() => {
                  const currentQuestionId = props.session.currentQuestion.question_id
                  const currentQuestionIndex = props.session.currentQuestionOrder.indexOf(currentQuestionId)
                  const nextQuestion = props.session.currentQuestionOrder[currentQuestionIndex + 1]
                  props.getQuestionDetail(nextQuestion)
                }}
              >
                Next
              </LinkRight>
              :
              <LinkRight
                onClick={() => {
                  props.reviewSection()
                }}
              >
                Next
              </LinkRight>
            }
          </>
        )}
      />

    </>
  )
}


const Container = styled.div`
  padding: 0 30px 0 30px;
`

const Text = styled.div`
  font-family: Gilroy-Medium;
  font-size: 16px;
  margin-bottom: 30px;
`

const MainContent = styled.div`
  display: flex;
  align-items: flex-start;

`

const QuestionContent = styled.div`
  flex: 2;
  width: 0;
  padding-top: 30px;
`

const QuestionStem = styled.div`
  flex: 3;
  width: 0;
  margin-right: 40px;
  font-family: Gilroy-Medium;
  text-align: justify;
  font-size: 16px;;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 7px solid #006daa;
  padding-right: 30px;
  padding-top: 30px;
  padding-bottom: 200px;
  height: 100vh;
`

const QuestionStemText = styled.div`
  margin-bottom: 25px;
`

const QuestionStemImage = styled.img`
  max-width: 100%;
`

const QuestionImage = styled.img`
  max-width: 100%;
  margin-bottom: 20px;
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

const TopLink = styled.div`
  color: white;
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  svg{
    margin-right: 5px;
  }
`

export default connect(mapStateToProps, mapDispatchToProps)(Question)
