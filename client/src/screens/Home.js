import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { getAllExams } from '../actions/content'
import Loading from '../components/Shared/Loading'

import styled from 'styled-components'
import { AiOutlineArrowRight } from "react-icons/ai";


const mapDispatchToProps = { getAllExams }

const mapStateToProps = (state) => {
  return state
}

const Home = (props) => {

  useEffect(() => {
    props.getAllExams(props.type)
  }, [props.history.location.pathname])

  const SectionMocks = ({
    examList,
    topic
  }) => {
    return (
      <>
        <SectionTitle>
          {topic}
        </SectionTitle>
        <ExamList>
          {examList.map((exam, i) => {
            if (exam.name.includes(topic)) {
              return (
                <Card key={i}
                  onClick={() => {
                    props.history.push(`/${props.type.toLowerCase()}/` + exam.structure_id.toString())
                  }}
                >
                  <CardTop>
                    <CardHeading
                      type="mock"
                    >{exam.name}</CardHeading>
                  </CardTop>

                  <CardBottom>
                    <CardLength>
                      {exam.time} min
                  </CardLength>
                    <Button>
                      <AiOutlineArrowRight color="#f89800" size={25} />
                    </Button>
                  </CardBottom>

                </Card>
              )
            }
          })}
        </ExamList>
      </>
    )
  }

  if (props.content.isFetchingExams) return <Loading />
  if (!props.content.allExams) return null

  return (
    <Container>
      <Title>{props.type}s</Title>

      {props.type === "Exam" ?

        <>
          <ExamList>
            {props.content.allExams.map((exam, i) => {
              return (
                <Card key={i}
                  onClick={() => {
                    props.history.push(`/${props.type.toLowerCase()}/` + exam.structure_id.toString())
                  }}
                >
                  <CardTop>
                    <CardHeading type="exam">{exam.name}</CardHeading>
                  </CardTop>

                  <CardBottom>
                    <CardLength>
                      {exam.time} min
                  </CardLength>
                    <Button>
                      <AiOutlineArrowRight color="#f89800" size={25} />
                    </Button>
                  </CardBottom>

                </Card>
              )
            })}
          </ExamList>
        </>
        :
        <>
          <SectionMocks
            topic="Verbal Reasoning"
            examList={props.content.allExams}
          />
          <SectionMocks
            examList={props.content.allExams}
            topic="Decision Making"
          />
          <SectionMocks
            examList={props.content.allExams}
            topic="Quantitative Reasoning"
          />
          <SectionMocks
            examList={props.content.allExams}
            topic="Abstract Reasoning"
          />
          <SectionMocks
            examList={props.content.allExams}
            topic="Situational Judgement"
          />
        </>

      }

    </Container>
  )
}

const Title = styled.div`
  color: rgba(0,0,0,0.25);
  font-family: Gilroy-Regular;
  font-size: 17px;
  padding: 15px 0;
`
const Container = styled.div`
  padding: 30px;
  margin-left: 340px;
`

const ExamList = styled.div`
  display: flex;
  margin-top: 20px;
  flex-wrap: wrap;
`

const CardHeading = styled.div`
  font-family: ${props => props.type === "exam" ? "Gilroy-Bold" : "Gilroy-Medium"};
  font-size: 20px;
`

const CardText = styled.div`
  font-family: Gilroy-Medium;
  font-size: 15px;
`

const CardLength = styled.div`
  color: rgba(0,0,0,0.3)
`

const CardTop = styled.div`
`

const CardBottom = styled.div`
  flex-direction: row;
  display: flex;
  align-items: flex-end;
  justify-content: space-between
`

const Button = styled.div`
`

const Card = styled.div`
  background: white;
  box-shadow: 10px 10px 20px rgba(0,0,0, 0.05);
  padding: 20px;
  border-radius: 15px;
  width: 200px;
  height: 100px;
  margin-right: 20px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 20px;
`

const SectionTitle = styled.div`
  font-size: 20px;
  font-family: Gilroy-Bold;
  margin-top: 28px
`
export default connect(mapStateToProps, mapDispatchToProps)(Home)
