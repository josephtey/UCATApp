import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { getAllExams } from '../actions/content'
import Loading from '../components/Shared/Loading'

import styled from 'styled-components'
import { Heading } from 'rebass'
import { AiOutlineArrowRight } from "react-icons/ai";


const mapDispatchToProps = { getAllExams }

const mapStateToProps = (state) => {
  return state
}

const Home = (props) => {

  useEffect(() => {
    props.getAllExams()
  }, [])

  if (props.content.isFetchingExams) return <Loading />
  if (!props.content.allExams) return null

  return (
    <Container>
      <Heading>Exams</Heading>
      <ExamList>
        {props.content.allExams.map((exam, i) => {
          return (
            <Card key={i}
              onClick={() => {
                props.history.push("/exam/" + exam.structure_id.toString())
              }}
            >
              <CardTop>
                <CardHeading>{exam.name}</CardHeading>
                <CardText>{exam.description}</CardText>
              </CardTop>

              <CardBottom>
                <CardLength>
                  90 min
                </CardLength>
                <Button>
                  <AiOutlineArrowRight color="#5843BE" size={25} />
                </Button>
              </CardBottom>

            </Card>
          )
        })}
      </ExamList>
    </Container>
  )
}

const Container = styled.div`
  padding: 30px;
`

const ExamList = styled.div`
  display: flex;
  margin-top: 20px;
`

const CardHeading = styled.div`
  font-family: Gilroy-Bold;
  font-size: 22px
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
  height: 200px;
  margin-right: 20px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`

export default connect(mapStateToProps, mapDispatchToProps)(Home)
