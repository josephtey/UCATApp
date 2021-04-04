import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import styled from 'styled-components'
import Loading from '../components/Shared/Loading'
import { getAllStudents, getStudentStats, getCategories } from '../actions/content'
import Select from 'react-select';
import ProfileStats from '../components/Profile/ProfileStats'
import {
  Text
} from 'rebass'

const mapDispatchToProps = { getAllStudents, getStudentStats, getCategories }
const mapStateToProps = (state) => {
  return state
}

const convertToArr = (allStudents) => {
  const dropdownStudents = allStudents.map((student) => {
    return {
      value: student,
      label: student.display_name
    }
  })
  console.log(dropdownStudents)
  return dropdownStudents
}

const Dashboard = (props) => {
  const [selectedStudent, setSelectedStudent] = useState()

  useEffect(() => {
    props.getAllStudents()
    props.getCategories()
  }, [])

  useEffect(() => {
    if (selectedStudent) {
      props.getStudentStats(selectedStudent.value.student_id)
    }
  }, [selectedStudent])

  if (props.content.isFetchingStudents || !props.content.allStudents || !props.content.categories) return <Loading />

  return (
    <Container>
      <PreHeading>Teacher Dashboard</PreHeading>
      <DropdownMenu>
        <Select
          placeholder="Select student..."
          value={selectedStudent}
          onChange={(selectedValue) => {
            setSelectedStudent(selectedValue)
          }}
          className="questionCountDropdown"
          isSearchable={false}
          options={convertToArr(props.content.allStudents)}
        />
      </DropdownMenu>

      {props.content.isFetchingStudentStats ?
        <Loading />
        :
        <>
          {props.content.studentStats && selectedStudent ?
            <ProfileStats
              student={selectedStudent.value}
              studentStats={props.content.studentStats}
              categories={props.content.categories}
            />
            :
            <Text style={{ color: 'rgba(0,0,0,0.3)', marginTop: '40px' }}>Select a student in the dropdown menu above.</Text>
          }
        </>
      }


    </Container>
  )
}

const Container = styled.div`
  padding: 30px;
  margin-left: 340px;
`
const PreHeading = styled(Text)`
  color: rgba(0,0,0,0.3);
  padding-bottom: 40px;
  font-family: Gilroy-Regular;
`

const DropdownMenu = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 15px;
  width: 400px;
`
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
