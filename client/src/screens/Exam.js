import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { getExamDetail, getStructureSessions, resetExamDetail } from '../actions/content'
import { createSession } from '../actions/session'
import styled from 'styled-components'
import {
  Text
} from 'rebass'
import Loading from '../components/Shared/Loading'
import { Button } from '../components/Shared/Elements'
import { AiOutlineArrowRight } from "react-icons/ai"
import { useDidMountEffect } from '../utils/helpers'
import { TiTick } from "react-icons/ti";

const mapDispatchToProps = { getExamDetail, resetExamDetail, createSession, getStructureSessions }

const mapStateToProps = (state) => {
  return state
}

const calculateTimeLeft = (sectionTime, startTime) => {
  const timeElapsed = (new Date().getTime() - new Date(startTime).getTime()) / 60000
  const timeLeft = sectionTime - timeElapsed

  if (timeLeft > 0) {
    return Math.round(timeLeft)
  } else {
    return 0
  }
}

const SectionCard = ({
  sectionName,
  questionCount,
  time,
  status,
  action
}) => {
  return (

    <Card
      status={status}
      className="hvr-float"
    >
      <CardLeft>
        <CardTime className="time">
          {status === "ongoing" || status === "future" ?
            <>
              {time} <br /> min
            </>
            :
            <>
              <TiTick color="#f89800" size={40} />
            </>
          }

        </CardTime>

        <CardInfo>
          <CardTitle>{sectionName}</CardTitle>
          <Caption>{questionCount} questions</Caption>
        </CardInfo>
      </CardLeft>

      {action ?
        <CardRight>
          {action()}
        </CardRight>
        : null}

    </Card>
  )
}

const Exam = (props) => {

  useEffect(() => {
    props.getExamDetail(props.match.params.structure_id)
    console.log(props.auth.userData)
    props.getStructureSessions(props.match.params.structure_id, props.auth.userData.student_id)

    return () => {
      props.resetExamDetail()
    }

  }, [])

  useDidMountEffect(() => {
    if (props.session.currentSession) {
      props.history.push('/session/' + props.session.currentSession.session_id)
    }
  }, [props.session.currentSession])

  if (props.content.isFetchingExamDetail || props.content.isFetchingSessions) return <Loading />
  if (!props.content.examDetail || !props.content.structureSessions) return null

  return (
    <Container>
      <PreHeading>Details</PreHeading>

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
          {props.content.structureSessions.length === 0 ?
            <Button
              type="primary"
              color="orange"
              label="Start Exam"
              onClick={() => {
                props.createSession(props.content.examDetail.details.structure_id, props.auth.userData.student_id)
              }}
            />
            : <>

              {props.content.structureSessions[0].completed ?
                <OrangeLink
                  onClick={() => {
                    props.createSession(props.content.examDetail.details.structure_id, props.auth.userData.student_id)
                  }}
                >
                  Re-attempt Exam
              </OrangeLink>
                : null}

              {!props.content.structureSessions[0].completed ?
                <Button
                  label={"Resume Exam"}
                  type="primary"
                  color="orange"
                  onClick={() => {
                    props.history.push("/session/" + props.content.structureSessions[0].session_id)
                  }}
                />
                : null}

            </>}



        </HeaderRight>
      </Header>

      <Sections>
        {props.content.examDetail.sections.map((section, i) => {
          const started = props.content.structureSessions.length > 0
          let sectionStartTime = null, sectionEndTime = null

          if (started) {
            sectionStartTime = props.content.structureSessions[0].start_time[i] ? props.content.structureSessions[0].start_time[i] : null
            sectionEndTime = props.content.structureSessions[0].end_time[i] ? props.content.structureSessions[0].end_time[i] : null
          }

          if (sectionEndTime && sectionStartTime) {

            // If the section is finished!

            return (
              <SectionCard
                key={i}
                sectionName={section.name}
                questionCount={section.question_order.length}
                status="finished"
                time={null}
                action={null}
              />
            )
          } else if (sectionStartTime && !sectionEndTime) {

            // If the section is currently ongoing!

            const timeLeft = calculateTimeLeft(section.time, sectionStartTime)

            return (
              <SectionCard
                key={i}
                sectionName={section.name}
                questionCount={section.question_order.length}
                status="ongoing"
                time={timeLeft}
                action={() => {
                  return (
                    <div onClick={() => {
                      props.history.push('/session/' + props.content.structureSessions[0].session_id)
                    }}>
                      <AiOutlineArrowRight color="white" size={32} />
                    </div>
                  )
                }
                }
              />
            )
          } else {
            return (
              <SectionCard
                key={i}
                sectionName={section.name}
                questionCount={section.question_order.length}
                status="future"
                time={section.time}
                action={null}
              />
            )
          }

        })}
      </Sections>

      <PastSessions>
        {props.content.structureSessions.length > 0 ?
          <PreHeading
            style={{ 'padding-bottom': 10 }}
          >Past Sessions</PreHeading>
          : null
        }

        {props.content.structureSessions.map((session) => {
          if (session.completed) {
            return (
              <Card
                className="hvr-float"
                onClick={() => {
                  props.history.push(`/session/${session.session_id}`)
                }}
                style={{
                  cursor: 'pointer'
                }}
              >

                <CardTitle>
                  {new Date(session.start_time[0]).toLocaleDateString()}
                </CardTitle>
                <CardInfo>
                  Score: {session.score}
                </CardInfo>

              </Card>
            )
          }
        })}
      </PastSessions>

    </Container >
  )
}
const PastSessions = styled.div`

`
const Caption = styled(Text)`
  opacity: 0.6;
`
const CardTime = styled.div`
  height: 70px;
  width: 70px;
  border-radius: 20px;
  border: 2px solid #f89800;
  align-items: center;
  justify-content: center;
  display: flex;
  text-align: center
`

const CardInfo = styled.div`
  margin-left: 20px;
`

const CardTitle = styled.div`
  font-family: Gilroy-SemiBold;
  font-size: 20px;
`

const Card = styled.div`
  background: ${props => props.status === "ongoing" ? '#f89800' : 'white'};
  color: ${props => props.status === "ongoing" ? 'white' : 'black'};
  box-shadow: 10px 10px 20px rgba(0,0,0, 0.05);
  padding: 15px 20px;
  border-radius: 15px;
  margin-bottom: 20px;
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .time {
    color: ${props => props.status === "ongoing" ? 'white' : '#f89800'};
  }
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
  display: flex;
  align-items: center;
  
  div {
    margin-left: 10px;
  }
`

const CardLeft = styled.div`
  display: flex;
  align-items: center;
`

const CardRight = styled.div`
  padding-right: 20px;
  cursor: pointer;
`

const OrangeLink = styled.div`
  color: #f89800;
  opacity: 0.5;
  cursor: pointer;
`

export default connect(mapStateToProps, mapDispatchToProps)(Exam)
