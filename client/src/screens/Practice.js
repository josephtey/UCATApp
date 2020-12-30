import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { getCategories } from '../actions/content'
import Loading from '../components/Shared/Loading'

import styled from 'styled-components'
import { AiOutlineArrowRight } from "react-icons/ai";


const mapDispatchToProps = { getCategories }

const mapStateToProps = (state) => {
  return state
}

const Practice = (props) => {

  useEffect(() => {
    props.getCategories()
  }, [])

  if (props.content.isFetchingCategories) return <Loading />
  if (!props.content.categories) return null

  return (
    <Container>
      <Title>Practice</Title>
      <ExamList>
        {props.content.categories.map((category, i) => {
          return (
            <Card
              onClick={() => {
                props.history.push('/practice/' + category.category_id)
              }}
            >
              <CardTop>
                <CardHeading>{category.name}</CardHeading>
              </CardTop>

              <CardBottom>
                <CardLength>
                  Practice
                </CardLength>
                <Button>
                  <AiOutlineArrowRight color="#f89800" size={25} />
                </Button>
              </CardBottom>

            </Card>
          )
        })}
      </ExamList>
    </Container>
  )
}

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

const ExamList = styled.div`
  display: flex;
  margin-top: 20px;
  flex-wrap: wrap;
`

const CardHeading = styled.div`
  font-family: Gilroy-Bold;
  font-size: 22px
`

const CardText = styled.div`
  font-family: Gilroy-Medium;
  font-size: 15px;
`

const CardLength = styled.div`
  color: rgba(0,0,0,0.3);
  justify-content: center;
`

const CardTop = styled.div`
`

const CardBottom = styled.div`
  flex-direction: row;
  display: flex;
  align-items: flex-end;
  justify-content: space-between
`

const Button = styled.div`
`

const Card = styled.div`
  background: white;
  box-shadow: 10px 10px 20px rgba(0,0,0, 0.05);
  padding: 20px;
  border-radius: 15px;
  width: 200px;
  height: 100px;
  margin-right: 20px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 20px;
`

export default connect(mapStateToProps, mapDispatchToProps)(Practice)
