import React, { useState } from 'react';
import { connect } from 'react-redux'
import { getAllExams } from '../actions/content'
import { AiOutlineArrowRight } from "react-icons/ai";
import { import_exam, import_questions } from "../api/db"
import styled from 'styled-components'


const mapDispatchToProps = { getAllExams }

const mapStateToProps = (state) => {
  return state
}

const Import = (props) => {
  const [examData, setExamData] = useState()
  const [questionData, setQuestionData] = useState()

  return (
    <Container>
      <Title>Import</Title>
      <CardList>
        <Card>
          <CardHeading>Import Exam/Mock</CardHeading> <br />
          <input
            type="file"
            accept="application/json"
            onChange={async (event) => {
              let reader = new FileReader();
              reader.onload = (event) => {
                let obj = JSON.parse(event.target.result);
                setExamData(obj)
              }
              reader.readAsText(event.target.files[0]);
            }}
          />
          <ImportButton
            onClick={async () => {
              if (examData) {
                const result = await import_exam(examData)

                alert(result)
              } else {
                alert("Invalid JSON.")
              }
            }}
          >
            <AiOutlineArrowRight color="#f89800" size={25} />
          </ImportButton>
        </Card>
        <Card>
          <CardHeading>Import Questions</CardHeading>
          <input
            type="file"
            accept="application/json"
            onChange={async (event) => {
              let reader = new FileReader();
              reader.onload = (event) => {
                let obj = JSON.parse(event.target.result);
                setQuestionData(obj)
              }
              reader.readAsText(event.target.files[0]);
            }}
          />
          <ImportButton
            onClick={async () => {
              if (questionData) {
                const result = await import_questions(questionData)

                alert(result)
              } else {
                alert("Invalid JSON.")
              }
            }}
          >
            <AiOutlineArrowRight color="#f89800" size={25} />
          </ImportButton>
        </Card>
      </CardList>
    </Container>
  )
}

const ImportButton = styled.div`
  display: flex;
  width: 100%;
  padding-top: 20px;
  align-items: flex-end;
  justify-content: flex-end;
  cursor: pointer;
`
const CardList = styled.div`
  display: flex;
  margin-top: 20px;
  flex-wrap: wrap;
`
const Title = styled.div`
  color: rgba(0,0,0,0.25);
  font-family: Gilroy-Regular;
  font-size: 17px;
  padding: 15px 0;
`
const Container = styled.div`
  padding: 30px;
  margin-left: 340px;
`

const CardHeading = styled.div`
  font-family: Gilroy-Bold;
  font-size: 22px
`

const CardText = styled.div`
  font-family: Gilroy-Medium;
  font-size: 15px;
`

const Card = styled.div`
  background: white;
  box-shadow: 10px 10px 20px rgba(0,0,0, 0.05);
  padding: 20px;
  border-radius: 15px;
  width: 30%;
  margin-right: 20px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 20px;
`
export default connect(mapStateToProps, mapDispatchToProps)(Import)
