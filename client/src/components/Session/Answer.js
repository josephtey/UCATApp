import React, { useState } from 'react';
import { connect } from 'react-redux'
import { getQuestionDetail, createResponse, reviewSection, getSessionResponses, flagResponse, changeMode } from '../../actions/session'
import Loading from '../Shared/Loading'
import styled from 'styled-components'
import BottomBar from './BottomBar'
import { RadioBoxAnswer, DragAndDropReview, DraggableWindow } from '../Shared/Elements'
import { useDidMountEffect } from '../../utils/helpers';
import TopBarSecondary from '../Session/TopBarSecondary'
import { BiCalculator, BiBook } from "react-icons/bi";
import Modal from 'react-modal';
import Calculator from '../Calculator/calculator'

const mapDispatchToProps = { getQuestionDetail, createResponse, reviewSection, getSessionResponses, flagResponse, changeMode }

const mapStateToProps = (state) => {
  return state
}

Modal.setAppElement('#root')

const Answer = (props) => {

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
      <DraggableWindow
        isOpen={props.calculatorModalIsOpen}
        setClose={() => {
          props.setCalculatorModalIsOpen(false)
        }}
        title="Calculator"
      >
        <Calculator />
      </DraggableWindow>

      <DraggableWindow
        isOpen={props.scratchpadModalIsOpen}
        setClose={() => {
          props.setScratchpadModalIsOpen(false)
        }}
        title="Scratch Pad"
      >
        <textarea rows="20" cols="50"></textarea>
      </DraggableWindow>

      <DraggableWindow
        isOpen={props.explanationModalIsOpen}
        setClose={() => {
          props.setExplanationModalIsOpen(false)
        }}
        title="Explanation"
      >
        {props.session.currentQuestion.explanation ?
          <ExplanationText>
            {props.session.currentQuestion.explanation.split("<br/>").map((para) => {
              return (
                <>
                  {para} <br />
                </>
              )
            })}
            {}
          </ExplanationText>
          :
          <ExplanationText>
            There is no explanation for this question.
            </ExplanationText>

        }
      </DraggableWindow>

      {!props.session.currentStem.layout || props.session.currentStem.layout.toLowerCase() === "side by side" ?
        <Border />
        : null}
      <TopBarSecondary
        leftContent={() => {
          return (
            <>
              <TopLink
                onClick={() => {
                  props.setCalculatorModalIsOpen(true)
                }}
              >
                <BiCalculator color="white" size={20} /> Calculator
              </TopLink>

              <TopLink
                onClick={() => {
                  props.setScratchpadModalIsOpen(true)
                }}
              >
                <BiBook color="white" size={20} /> Scratch Pad
              </TopLink>
              <TopLink onClick={() => {
                props.setExplanationModalIsOpen(true)
              }}>
                Show Explanation
              </TopLink>
            </>
          )
        }}
        rightContent={() => {
          return (
            <>
              <TopLink>
                Question {props.session.currentQuestionOrder.indexOf(props.session.currentQuestion.question_id) + 1} of {props.session.currentQuestionOrder.length}
              </TopLink>
            </>
          )
        }}
      />
      {!props.session.isFetchingQuestionDetail ?
        <Container>

          <MainContent
            layout={props.session.currentStem.layout ? props.session.currentStem.layout : "side by side"}
          >
            {props.session.currentStem ?
              <QuestionStem
                layout={props.session.currentStem.layout ? props.session.currentStem.layout : "side by side"}>
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
                <QuestionStemImage src={props.session.currentStem.image} category_id={props.session.currentStem.category_id} />
              </QuestionStem>
              : null}
            <QuestionContent
              layout={props.session.currentStem.layout ? props.session.currentStem.layout : "side by side"}
            >
              {props.session.currentQuestion.question ?
                <Text>
                  {props.session.currentQuestion.question}
                </Text>
                : null}

              {props.session.currentQuestion.image ?
                <QuestionImage src={props.session.currentQuestion.image} />
                : null}

              {props.session.currentQuestion.type === "MC" || props.session.currentQuestion.type === "MCSJ" ?
                <RadioBoxAnswer
                  options={props.session.currentQuestion.options}
                  images={props.session.currentQuestion.option_images}
                  correctValue={props.session.currentQuestion.answer}
                  selectedValue={() => {
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
                  <DragAndDropReview
                    options={props.session.currentQuestion.options}
                    correctValue={props.session.currentQuestion.answer.split(";")}
                    selectedValue={() => {
                      const response = props.session.sessionResponses.find(
                        item => item.question_id === props.session.currentQuestion.question_id
                      )
                      if (response && response.value.split(";").length > 0) {
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
                props.changeMode("results")
              }}
            >
              Return to Results
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
                  props.getQuestionDetail(nextQuestion, "answer")
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
                  props.getQuestionDetail(nextQuestion, "answer")
                }}
              >
                Next
              </LinkRight>
              :
              null}
          </>
        )}
      />

    </>
  )
}


const ExplanationText = styled.div`
  padding: 30px;
  background: white;
  width: 400px;
  box-shadow: 5px 5px 30px 0px rgba(0,0,0,0.5);
`


const Container = styled.div`
  padding: 0 30px 0 30px;
`

const Text = styled.div`
  font-family: arial;
  font-size: 16px;
  margin-bottom: 30px;
`

const MainContent = styled.div`
  display: flex;
  flex-direction: ${props => props.layout == "normal" ? "column" : "row"};
  align-items: flex-start;
`

const QuestionContent = styled.div`
  ${props => props.layout == "normal" ? '' : 'flex: 2;'}
  width: ${props => props.layout == "normal" ? '100%' : 0};
  padding: 30px 0 50px 0;
`

const QuestionStem = styled.div`
  ${props => props.layout == "normal" ? '' : 'flex: 3;'}
  width: ${props => props.layout == "normal" ? 'auto' : 0};
  margin-right: 40px;
  font-family: arial;
  text-align: justify;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-right: 30px;
  padding-top: 30px;
`

const QuestionStemText = styled.div`
  margin-bottom: 25px;
`

const QuestionStemImage = styled.img`
  max-width: ${props => props.category_id === 17 ? '50%' : '70%'};
`

const QuestionImage = styled.img`
  max-width: 30%;
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
  cursor: pointer;
  
  svg{
    margin-right: 5px;
  }
`

const ModalTitle = styled.div`
  font-family: arial;
  font-weight: bold;
  font-size: 20px;
  justify-content: space-between;
  align-items: center;
  display: flex;
  width: 100%;
`

const CloseButton = styled.div`
  cursor: pointer;
`

const ModalText = styled.div`

`

const Border = styled.div`
  width: 7px;
  position: fixed;
  left: 58.5%;
  height: 100vh;
  background: #056DAA;
`


export default connect(mapStateToProps, mapDispatchToProps)(Answer)
