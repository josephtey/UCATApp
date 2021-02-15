import React, { useEffect, useState } from 'react';
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
import Select from 'react-select';


const mapDispatchToProps = { getCategoryDetail, startPractice, resetCategoryDetail }

const mapStateToProps = (state) => {
  return state
}

const convertArrToOptions = (arr, perstem) => {
  let options = []
  for (let i = 0; i < arr.length; i++) {
    options.push({
      value: arr[i] / perstem,
      label: arr[i]
    })
  }

  console.log(options)

  return options
}

const PracticeTopic = (props) => {

  const [numberOfQuestions, setNumberOfQuestions] = useState()

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
          <Text>
            {props.content.categoryDetail.totalCompletedQuestions}/{props.content.categoryDetail.totalQuestions} Questions tested
          </Text>

          <Text style={{ color: 'rgba(0,0,0,0.3)', marginTop: '40px' }}>To practice this topic, select the number of questions you want to practice on the right.</Text>
        </HeaderLeft>

        <HeaderRight>
          {props.content.categoryDetail.sessions.length == 0 || (props.content.categoryDetail.sessions.length > 0 && props.content.categoryDetail.sessions[0].completed) ?
            <DropdownMenu>
              <Text>Number of Questions</Text>
              <Select
                value={numberOfQuestions}
                onChange={(selectedValue) => {
                  setNumberOfQuestions(selectedValue)
                }}
                className="questionCountDropdown"
                isSearchable={false}
                options={convertArrToOptions(
                  props.content.categoryDetail.details.intervals,
                  props.content.categoryDetail.details.per_stem
                )}
              />
            </DropdownMenu>
            : null}
          {numberOfQuestions ?
            <>
              {props.content.categoryDetail.sessions.length == 0 ?
                <Button
                  type="primary"
                  color="orange"
                  label="Start Practice"
                  onClick={() => {
                    props.startPractice(
                      props.content.categoryDetail.details.category_id,
                      props.content.categoryDetail.details.name,
                      props.auth.userData.student_id,
                      numberOfQuestions.value
                    )
                  }}
                />
                :
                <>
                  {props.content.categoryDetail.sessions[0].completed ?
                    <Button
                      type="primary"
                      color="orange"
                      label="Start Practice"
                      onClick={() => {
                        props.startPractice(
                          props.content.categoryDetail.details.category_id,
                          props.content.categoryDetail.details.name,
                          props.auth.userData.student_id,
                          numberOfQuestions.value
                        )
                      }}
                    />
                    : null}
                </>}
            </>
            : null}

          {props.content.categoryDetail.sessions.length > 0 && !props.content.categoryDetail.sessions[0].completed ?
            <Button
              label={"Resume Practice Session"}
              type="primary"
              color="orange"
              onClick={() => {
                props.history.push("/session/" + props.content.categoryDetail.sessions[0].session_id)
              }}
            />
            : null}




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

                <CardLeft>
                  <CardTitle>
                    {new Date(session.start_time[0]).toLocaleTimeString()} - {new Date(session.end_time[session.end_time.length - 1]).toLocaleTimeString()}
                  </CardTitle>
                  <CardSubtitle>
                    {new Date(session.start_time[0]).toLocaleDateString()}
                  </CardSubtitle>
                </CardLeft>
                <CardInfo>
                  {session.score_breakdown[Object.keys(session.score_breakdown)[0]][0]} Correct | {session.score_breakdown[Object.keys(session.score_breakdown)[0]][2]} Partially Correct | {session.score_breakdown[Object.keys(session.score_breakdown)[0]][1]} Incorrect <br />
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
  justify-content: center;
  align-items: center;
`
const DropdownMenu = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 15px;
`
const CardLeft = styled.div`

`

const CardSubtitle = styled.div`
  
`

export default connect(mapStateToProps, mapDispatchToProps)(PracticeTopic)
