import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { getAllExams } from '../actions/content'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import {
  Heading,
  Card,
  Text
} from 'rebass'

const mapDispatchToProps = { getAllExams }

const mapStateToProps = (state) => {
  return state
}

const Home = ({
  content,
  getAllExams
}) => {

  useEffect(() => {
    getAllExams()
  }, [])

  return (
    <Container>
      <Heading>Exams</Heading>
      {content.allExams.map((exam, i) => {
        return (
          <Card style={{ margin: '20px 0' }} key={i}>
            <Link to={"/exam/" + exam.structure_id.toString()}>{exam.name}</Link>
            <Text>{exam.description}</Text>
          </Card>
        )
      })}
    </Container>
  )
}

const Container = styled.div`
  padding: 30px;
`

export default connect(mapStateToProps, mapDispatchToProps)(Home)
