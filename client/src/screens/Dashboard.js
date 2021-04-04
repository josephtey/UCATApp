import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import styled from 'styled-components'
import Loading from '../components/Shared/Loading'
import { getAllStudents, getStudentStats, getCategories } from '../actions/content'
import Select from 'react-select';
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
            <>
              <Header>
                <Title>
                  {selectedStudent.value.display_name}
                </Title>
                <Text>
                  Student Id: {selectedStudent.value.student_id}
                </Text>
              </Header>

              <CardList>
                <Card>
                  <CardTop>
                    {parseInt(props.content.studentStats.response_stats_true[0].count) + parseInt(props.content.studentStats.response_stats_false[0].count)}
                  </CardTop>

                  <CardBottom>
                    Total Responses
              </CardBottom>
                </Card>
                <Card>
                  <CardTop>
                    {props.content.studentStats.response_stats_true[0].count}
                  </CardTop>

                  <CardBottom>
                    Correct Responses
                </CardBottom>
                </Card>
                <Card>
                  <CardTop>
                    {props.content.studentStats.response_stats_false[0].count}
                  </CardTop>

                  <CardBottom>
                    Incorrect Responses
              </CardBottom>
                </Card>
              </CardList>

              {props.content.categories.map((category) => {
                return (
                  <div>
                    {category.name}
                  </div>
                )
              })}
            </>
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
  flex-direction: column;
  margin: 40px 0;
`

const Card = styled.div`
  background: white;
  box-shadow: 10px 10px 20px rgba(0,0,0, 0.05);
  padding: 20px;
  border-radius: 15px;
  width: 200px;
  height: 100px;
  margin-right: 20px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 20px;
`

const CardTop = styled.div`
  font-family: "Gilroy-Bold";
  font-size: 40px;
`

const CardBottom = styled.div`
  color: rgba(0,0,0,0.3);
`

const DropdownMenu = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 15px;
  width: 400px;
`

const CardList = styled.div`
  display: flex;
  margin-top: 20px;
  flex-wrap: wrap;
`

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
