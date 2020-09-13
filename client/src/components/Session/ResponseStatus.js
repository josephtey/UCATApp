import React from 'react';
import { connect } from 'react-redux'
import { getSessionResponses, getQuestionDetail } from '../../actions/session'
import styled from 'styled-components'
import {
  Text
} from 'rebass'
import { useDidMountEffect } from '../../utils/helpers';

const mapDispatchToProps = { getSessionResponses, getQuestionDetail }

const mapStateToProps = (state) => {
  return state
}

const ResponseStatus = (props) => {

  useDidMountEffect(() => {
    props.getSessionResponses(
      props.session.currentSession.session_id,
      "section",
      props.session.currentSection.section_id
    )
  }, [props.session.newResponse])

  return (
    <Status>
      <Text>
        <Bar>
          {props.session.currentSection.question_order.map((question_id, i) => {

            const answered = props.session.sessionResponses.find(item => item.question_id === question_id)

            if (question_id === props.session.currentQuestion.question_id) {
              return (
                <CurrentQuestion
                  key={i}
                >
                  {i + 1}
                </CurrentQuestion>
              )
            } else {
              return (
                <QuestionBlock
                  answered={answered}
                  onClick={() => {
                    props.getQuestionDetail(question_id)
                  }}
                  key={i}
                >
                  {i + 1}
                </QuestionBlock>
              )
            }

          })}
        </Bar>
      </Text>
    </Status>
  )
}

const Status = styled.div`
  padding: 30px 0;
`

const Bar = styled.div`
  margin: 10px 0;
`

const QuestionBlock = styled.div`
  border-radius: 2px;
  display: inline-block;
  padding: 10px;
  margin-right: 5px;
  background: ${props => props.answered ? 'black' : 'white'};
  color: ${props => props.answered ? 'white' : 'black'};
  cursor: pointer;
`

const CurrentQuestion = styled.div`
  border-radius: 2px;
  display: inline-block;
  padding: 10px;
  margin-right: 5px;
  background: #0077CC;
  color: white;
`

export default connect(mapStateToProps, mapDispatchToProps)(ResponseStatus)



