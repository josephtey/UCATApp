import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { getCategories, getStudentStats } from '../actions/content'
import styled from 'styled-components'
import ProfileStats from '../components/Profile/ProfileStats'
import Loading from '../components/Shared/Loading'

const mapDispatchToProps = { getCategories, getStudentStats }
const mapStateToProps = (state) => {
  return state
}

const Profile = (props) => {

  useEffect(() => {
    props.getCategories()
    props.getStudentStats(props.auth.userData.student_id)
  }, [])

  if (!props.content.studentStats || !props.content.categories) return <Loading />

  return (
    <Container>
      <ProfileStats
        student={props.auth.userData}
        studentStats={props.content.studentStats}
        categories={props.content.categories}
      />
    </Container>
  )
}


const Container = styled.div`
  padding: 30px;
  margin-left: 340px;
`

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
