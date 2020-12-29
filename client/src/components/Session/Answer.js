import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { getQuestionDetail, createResponse, reviewSection, getSessionResponses, flagResponse, changeMode } from '../../actions/session'
import Loading from '../Shared/Loading'
import styled from 'styled-components'
import BottomBar from './BottomBar'
import { Button, LinkItem, RadioBoxAnswer, DragAndDropReview } from '../Shared/Elements'
import { useDidMountEffect } from '../../utils/helpers';


const mapDispatchToProps = { getQuestionDetail, createResponse, reviewSection, getSessionResponses, flagResponse, changeMode }

const mapStateToProps = (state) => {
  return state
}

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
      {!props.session.isFetchingQuestionDetail ?
        <Container>
          <PreHeading>
            <PreHeadingLeft>
              Question {props.session.currentQuestionOrder.indexOf(props.session.currentQuestion.question_id) + 1} of {props.session.currentQuestionOrder.length}
            </PreHeadingLeft>
          </PreHeading>

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
                <Title>
                  {props.session.currentQuestion.question}
                </Title>
                : null}

              {props.session.currentQuestion.image ?
                <QuestionImage src={props.session.currentQuestion.image} />
                : null}

              {props.session.currentQuestion.type === "MC" ?
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

          <ExplanationContent>
            <PreHeading>Explanation</PreHeading>
            {props.session.currentQuestion.explanation ?
              <ExplanationText>
                {props.session.currentQuestion.explanation}
              </ExplanationText>
              :
              <ExplanationText>
                There is no explanation for this question.
                </ExplanationText>

            }
          </ExplanationContent>

        </Container >
        : <Loading duringSession={true} />
      }

      <BottomBar
        leftContent={() => (
          <>
            <Button
              onClick={() => {
                props.changeMode("results")
              }}
              type="secondary"
              label="Return to Results"
              color="orange"
            />
          </>
        )}

        rightContent={() => (
          <>
            {props.session.currentQuestion.question_id !== props.session.currentQuestionOrder[0] ?
              <LinkItem
                color="teal"
                onClick={() => {
                  const currentQuestionId = props.session.currentQuestion.question_id
                  const currentQuestionIndex = props.session.currentQuestionOrder.indexOf(currentQuestionId)
                  const nextQuestion = props.session.currentQuestionOrder[currentQuestionIndex - 1]
                  props.getQuestionDetail(nextQuestion, "answer")
                }}
              >
                Previous Question
              </LinkItem>
              : null}

            {props.session.currentQuestion.question_id !== props.session.currentQuestionOrder.slice(-1)[0] ?
              <Button
                type="primary"
                label="Next Question"
                color="teal"
                onClick={() => {
                  const currentQuestionId = props.session.currentQuestion.question_id
                  const currentQuestionIndex = props.session.currentQuestionOrder.indexOf(currentQuestionId)
                  const nextQuestion = props.session.currentQuestionOrder[currentQuestionIndex + 1]
                  props.getQuestionDetail(nextQuestion, "answer")
                }}
              />
              :
              null}
          </>
        )}
      />

    </>
  )
}

const ExplanationContent = styled.div`
  margin: 25px 0;
`

const ExplanationText = styled.div`

`

const Container = styled.div`
  padding: 30px 0 80px 0;
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
const PreHeadingLeft = styled.div`

`

const MainContent = styled.div`
  display: flex;
  align-items: flex-start;

`

const QuestionContent = styled.div`
  flex: 1;
  width: 0;
`

const QuestionStem = styled.div`
  flex: 1;
  width: 0;
  margin-right: 40px;
  opacity: 0.7;
  font-family: Gilroy-Regular;
  text-align: justify;
  box-shadow: 10px 10px 20px rgba(0,0,0, 0.05);
  padding: 25px;
  background: white;
  border-radius: 12px;
  font-size: 13px;
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

export default connect(mapStateToProps, mapDispatchToProps)(Answer)
