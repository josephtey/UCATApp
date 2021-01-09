import React from 'react'
import styled from 'styled-components'
import { RiFlag2Fill, RiFlag2Line } from "react-icons/ri";
const ReviewCards = ({
  section,
  responses,
  onClick,
  mode
}) => {
  return (
    <Container>
      <QuestionCards>
        {section.question_order.map((question_id, i) => {
          const answered = responses.find(item => item.question_id === question_id)

          return (
            <Card key={i} onClick={() => {
              onClick(question_id, section)
            }}
            >
              <CardLeft>
                {answered && answered.flagged ?
                  <RiFlag2Fill color={'black'} size={20} />
                  :
                  <RiFlag2Line color={'black'} size={20} />
                }
                <Text color="black">Question {i + 1}</Text>
              </CardLeft>
              <CardRight>
                {answered && answered.value ?
                  <>
                    {mode === "Results" ?
                      <>
                        {answered.points === 1 ?
                          <Text color="green">Correct</Text>
                          : answered.points === 0 ?
                            <Text color="red">Incorrect</Text>
                            :
                            <Text color="blue">Partially Correct</Text>
                        }
                      </>
                      : null
                    }
                  </>
                  :
                  <Text
                    color="#f89800"
                  >
                    Incomplete
                  </Text>
                }
              </CardRight>


            </Card>
          )
        })}
      </QuestionCards>
    </Container>
  )
}

export default ReviewCards

const Container = styled.div`
`

const CardLeft = styled.div`
  display: flex;

  svg {
    margin-right: 5px;
  }
`

const CardRight = styled.div`

`

const QuestionCards = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const Card = styled.div`
  background: ${props => props.answered ? '#2ecfb0' : 'white'};
  color: ${props => props.answered ? 'white' : 'black'};

  padding: 10px;
  
  border-left: 1px solid #aaaaaa;
  border-bottom: 1px solid #aaaaaa;

  flex-basis: 31.75%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  &:nth-child(3n), &:last-child {
    border-right: 1px solid #aaaaaa;
  }
  
  &:nth-child(-n+3) {
    border-top: 1px solid #aaaaaa;
  }

`

const Text = styled.div`
  color: ${props => props.color};
`