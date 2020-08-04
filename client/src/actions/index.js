export const updateState = (newState) => {
    return {
        type: 'UPDATE_STATE',
        payload: newState
    }
}