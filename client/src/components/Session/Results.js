import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { stopSection } from '../../actions/session'
import Loading from '../Shared/Loading'
import styled from 'styled-components'
import {
  Heading,
  Card,
  Text,
  Button
} from 'rebass'

const mapDispatchToProps = { stopSection }

const mapStateToProps = (state) => {
  return state
}

const Results = (props) => {

  useEffect(() => {
    return () => {
      props.stopSection()
    }
  })

  if (props.session.isFetchingSession) return <Loading />
  if (!props.session.allSections || !props.session.currentSession || !props.session.sessionResponses) return null

  return (
    <Container>
      <Heading>Results</Heading><br />
      {props.session.allSections.map((section, i) => {
        return (
          <>
            <Heading
              fontSize={3}
              key={i}
            >
              {section.name}
            </Heading>

            {section.question_order.map((question_id, j) => {
              const response = props.session.sessionResponses.find(item => item.question_id === question_id)

              return (
                <>
                  <Card
                    key={j}
                  >
                    <Text>Question {j + 1} (id: {question_id})</Text>
                    <br />
                    {response ?
                      <Text><b>Your answer: </b>{response.value}</Text>
                      : null}

                  </Card>
                  <br />
                </>
              )
            })}
          </>
        )
      })}
    </Container>
  )
}

const Container = styled.div`
  padding: 30px 0;
`


export default connect(mapStateToProps, mapDispatchToProps)(Results)
