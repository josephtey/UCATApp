import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { getSessionResponses } from '../../actions/session'
import Loading from '../Shared/Loading'
import styled from 'styled-components'
import {
  Heading,
  Button,
  Text,
  Box
} from 'rebass'
import { useDidMountEffect } from '../../utils/helpers';

const mapDispatchToProps = { getSessionResponses }

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

  if (props.session.isFetchingResponses || props.session.isFetchingSession) return <Loading />
  if (!props.session.sessionResponses || !props.session.currentSection) return null

  return (
    <Status>
      <Heading fontSize={2}>
        Status
      </Heading>
      <Text>
        <ul>
          {props.session.currentSection.question_order.map((question_id, i) => {
            return (
              <li>
                Question {i + 1}
              </li>
            )
          })}
        </ul>
      </Text>
    </Status>
  )
}

const Status = styled.div`
  padding: 30px 0;
`


export default connect(mapStateToProps, mapDispatchToProps)(ResponseStatus)



