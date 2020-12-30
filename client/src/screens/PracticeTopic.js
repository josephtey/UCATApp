import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { getCategoryDetail, resetCategoryDetail } from '../actions/content'
import { startPractice } from '../actions/session'
import styled from 'styled-components'
import {
  Text
} from 'rebass'
import Loading from '../components/Shared/Loading'
import { Button } from '../components/Shared/Elements'
import { useDidMountEffect } from '../utils/helpers'

const mapDispatchToProps = { getCategoryDetail, startPractice, resetCategoryDetail }

const mapStateToProps = (state) => {
  return state
}

const PracticeTopic = (props) => {

  useEffect(() => {
    props.getCategoryDetail(props.match.params.category_id, props.auth.userData.student_id)

    return () => {
      props.resetCategoryDetail()
    }

  }, [])

  useDidMountEffect(() => {
    if (props.session.currentSession) {
      props.history.push('/session/' + props.session.currentSession.session_id)
    }
  }, [props.session.currentSession])

  if (props.content.isFetchingCategoryDetail) return <Loading />
  if (!props.content.categoryDetail) return null

  return (
    <Container>
      <PreHeading>Practice Details</PreHeading>

      <Header>
        <HeaderLeft>
          <Title>
            {props.content.categoryDetail.details.name}
          </Title>
        </HeaderLeft>

        <HeaderRight>
          {props.content.categoryDetail.sessions.length === 0 ?
            <Button
              type="primary"
              color="orange"
              label="Start Practice"
              onClick={() => {
                props.startPractice(
                  props.content.categoryDetail.details.category_id,
                  props.content.categoryDetail.details.name,
                  props.auth.userData.student_id,
                  3)
              }}
            />
            : <>

              {props.content.categoryDetail.sessions[0].completed ?
                <OrangeLink
                  onClick={() => {
                    props.startPractice(
                      props.content.categoryDetail.details.category_id,
                      props.content.categoryDetail.details.name,
                      props.auth.userData.student_id,
                      3)
                  }}
                >
                  Start Practice
              </OrangeLink>
                : null}

              {!props.content.categoryDetail.sessions[0].completed ?
                <Button
                  label={"Resume Exam"}
                  type="primary"
                  color="orange"
                  onClick={() => {
                    props.history.push("/session/" + props.content.categoryDetail.sessions[0].session_id)
                  }}
                />
                : null}

            </>}



        </HeaderRight>
      </Header>

      <PastSessions>
        {props.content.categoryDetail.sessions.length > 0 ?
          <PreHeading
            style={{ 'padding-bottom': 10 }}
          >Past Sessions</PreHeading>
          : null
        }

        {props.content.categoryDetail.sessions.map((session) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(PracticeTopic)
