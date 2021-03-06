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

const PracticeSection = ({
  props,
  categories,
  topic
}) => {
  return (
    <>
      <SectionTitle>
        {topic}
      </SectionTitle>
      <ExamList>
        {categories.filter(category => category.topic === topic).map((category, i) => {
          if (!["General Arithmetic", "Perimeter/Area/Volume", "Ranking Appropriateness"].includes(category.name)) {
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

                  </CardLength>
                  <Button>
                    <AiOutlineArrowRight color="#f89800" size={25} />
                  </Button>
                </CardBottom>

              </Card>
            )
          }
        })}
      </ExamList>
    </>
  )
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
      <PracticeSection
        props={props}
        categories={props.content.categories}
        topic="Verbal Reasoning"
      />
      <PracticeSection
        props={props}
        categories={props.content.categories}
        topic="Decision Making"
      />
      <PracticeSection
        props={props}
        categories={props.content.categories}
        topic="Quantitative Reasoning"
      />
      <PracticeSection
        props={props}
        categories={props.content.categories}
        topic="Abstract Reasoning"
      />
      <PracticeSection
        props={props}
        categories={props.content.categories}
        topic="Situational Judgement"
      />
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
  margin-top: 21px;
  flex-wrap: wrap;
`

const CardHeading = styled.div`
  font-family: Gilroy-Medium;
  font-size: 18px;
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
const SectionTitle = styled.div`
  font-size: 20px;
  font-family: Gilroy-Bold;
  margin-top: 28px
`
export default connect(mapStateToProps, mapDispatchToProps)(Practice)
