import { MessageActions } from '../actions'

export const messages = (state = [], action) => {
    switch (action.type) {
        case MessageActions.ADD_MESSAGE:
            return [
                ...state,
                action.message
            ]
        case MessageActions.REMOVE_MESSAGE:
            return state.filter(msg => msg !== action.message)
        default:
            return state
    }
}
