import React from 'react';
import { connect } from 'react-redux'
import {
  Heading,
  Card,
  Text,
  Button
} from 'rebass'
import { getStructureSessions } from '../../actions/content'
import Loading from '../Shared/Loading'

const mapDispatchToProps = { getStructureSessions }
const mapStateToProps = (state) => {
  return state
}

const Sessions = (props) => {

  if (props.content.isFetchingSessions) return <Loading />
  if (!props.content.structureSessions) return null

  return (
    <>
      <Heading>
        Sessions
      </Heading>
      {props.content.structureSessions.map((session, i) => (
        <Card style={{ marginBottom: '20px' }} key={i}>
          <Text>{session.session_id}</Text>
          <Button
            onClick={() => {
              props.resumeSession(session.session_id.toString())
            }}
          >
            Resume
          </Button>
        </Card>
      ))}
    </>
  )
}


export default connect(mapStateToProps, mapDispatchToProps)(Sessions)