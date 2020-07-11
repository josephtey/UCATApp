import { combineReducers } from 'redux'

const initialState = {
    state: 'hello'
}

const stateReducer = (state = initialState, action) => {
    if (action.type === "UPDATE_STATE") {
        state = action.payload
    }
    return state
}

export default combineReducers({
    state: stateReducer
})