import React from 'react'
import styled from 'styled-components'
import {
  Text
} from 'rebass'


const ProfileStats = ({
  student,
  studentStats,
  categories
}) => {
  return (
    <>
      <Header>
        <Title>
          {student.display_name}
        </Title>
      </Header>

      <CardList>
        <Card>
          <CardTop>
            {parseInt(studentStats.response_stats_true[0].count) + parseInt(studentStats.response_stats_false[0].count)}
          </CardTop>

          <CardBottom>
            Total Responses
              </CardBottom>
        </Card>
        <Card>
          <CardTop>
            {studentStats.response_stats_true[0].count}
          </CardTop>

          <CardBottom>
            Correct Responses
                </CardBottom>
        </Card>
        <Card>
          <CardTop>
            {studentStats.response_stats_false[0].count}
          </CardTop>

          <CardBottom>
            Incorrect Responses
              </CardBottom>
        </Card>
      </CardList>

      <br />
      <CardList>
        {categories.map((category) => {
          const numCorrect = studentStats.category_stats_true.find(cat => cat.category_id === category.category_id)
          const numWrong = studentStats.category_stats_false.find(cat => cat.category_id === category.category_id)

          if (numCorrect || numWrong) {
            return (
              <Card>
                <CardTopCategory>
                  <div>
                    {numCorrect ? numCorrect.count : 0} <span style={{ fontSize: '17px' }}>correct</span>
                  </div>

                  <div>
                    {numWrong ? numWrong.count : 0} <span style={{ fontSize: '17px' }}>wrong</span>
                  </div>
                </CardTopCategory>
                <CardBottom>
                  {category.name}
                </CardBottom>

              </Card>
            )
          } else {
            return null
          }

        })}
      </CardList>
    </>
  )
}

const Title = styled.div`
  font-family: Gilroy-Bold;
  font-size: 40px;
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


const CardList = styled.div`
  display: flex;
  margin-top: 20px;
  flex-wrap: wrap;
`

const CardTopCategory = styled.div`
  font-size: 30px;
  display: flex;
  flex-direction: column;
  width: 100%;
`

export default ProfileStats