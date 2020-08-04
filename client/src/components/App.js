import React, {useEffect} from 'react';
import {connect} from 'react-redux'
import {updateState} from '../actions'

const App = (props) => {
  useEffect(()=>{
    console.log(props)
  },[])
  return (
    <div
      onClick={()=>{
        props.updateState("goodbye")
      }}
    > App </div>
  );
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps, {updateState})(App);
