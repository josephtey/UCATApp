import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { getAllExams } from '../actions/content'

const mapDispatchToProps = { getAllExams }

const mapStateToProps = (state) => {
  return state
}

const Home = (props) => {
  useEffect(() => {
    props.getAllExams()

    console.log(props)
  }, [])
  return (
    <div>Home Page</div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
