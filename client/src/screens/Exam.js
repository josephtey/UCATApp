import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import Sessions from '../components/Exam/Sessions'
import { getExamDetail, getStructureSessions, resetExamDetail } from '../actions/content'
import { createSession } from '../actions/session'
import styled from 'styled-components'
import {
  Heading,
  Text
} from 'rebass'
import Loading from '../components/Shared/Loading'
import { useDidMountEffect } from '../utils/helpers'

const mapDispatchToProps = { getExamDetail, resetExamDetail, createSession, getStructureSessions }

const mapStateToProps = (state) => {
  return state
}

const Exam = (props) => {

  useEffect(() => {
    props.getExamDetail(props.match.params.structure_id)
    props.getStructureSessions(props.match.params.structure_id)

    return () => {
      props.resetExamDetail()
    }

  }, [])

  useDidMountEffect(() => {
    if (props.session.currentSession) {
      props.history.push('/session/' + props.session.currentSession.session_id)
    }
  }, [props.session.currentSession])

  if (props.content.isFetchingExamDetail) return <Loading />
  if (!props.content.examDetail) return null

  return (
    <Container>
      <PreHeading>Exam Details</PreHeading>

      <Header>
        <HeaderLeft>
          <Title>
            {props.content.examDetail.details.name}
          </Title>
          <Text>
            {props.content.examDetail.details.description}
          </Text>
        </HeaderLeft>

        <HeaderRight>
          <Button
            onClick={() => {
              props.createSession(props.content.examDetail.details.structure_id, 1)
            }}
          >Start!</Button>
        </HeaderRight>
      </Header>

      <Sections>
        {props.content.examDetail.sections.map((section, i) => (
          <Card key={i} >
            <CardTime>
              {section.time} <br /> min
            </CardTime>

            <CardInfo>
              <CardTitle>{section.name}</CardTitle>
              <Caption>{section.question_order.length} questions</Caption>

              {/* <Text>{section.description}</Text> */}
            </CardInfo>
          </Card>
        ))}
      </Sections>

      {/* <Sessions
        resumeSession={(session_id) => {
          props.history.push('/session/' + session_id)
        }}
      /> */}
    </Container >
  )
}
const Caption = styled(Text)`
  color: rgba(0,0,0,0.5)
`
const CardTime = styled.div`
  height: 70px;
  width: 70px;
  border-radius: 20px;
  border: 2px solid #f89800;
  align-items: center;
  justify-content: center;
  display: flex;
  text-align: center;
  color: #f89800
`

const CardInfo = styled.div`
  margin-left: 20px;
`

const CardTitle = styled.div`
  font-family: Gilroy-SemiBold;
  font-size: 20px;
`

const Card = styled.div`
  background: white;
  box-shadow: 10px 10px 20px rgba(0,0,0, 0.05);
  padding: 20px;
  border-radius: 15px;
  margin-bottom: 20px;
  max-width: 100%;
  display: flex;
  align-items: center;
`

const Container = styled.div`
  padding: 30px;
  margin-left: 340px;
`

const Sections = styled.div`
  padding: 20px 0;
`

const Title = styled.div`
  font-family: Gilroy-Bold;
  font-size: 40px;
`

const PreHeading = styled(Text)`
  color: rgba(0,0,0,0.3);
  padding-bottom: 40px;
  font-family: Gilroy-Regular;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`

const HeaderLeft = styled.div`
`

const HeaderRight = styled.div`
`

const Button = styled.div`
  background: #f89800;
  color: white;
  padding: 15px 20px;
  border-radius: 12px;
  cursor: pointer;
`

export default connect(mapStateToProps, mapDispatchToProps)(Exam)
