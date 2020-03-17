export const MessageActions = {
    ADD_MESSAGE: 'ADD_MESSAGE',
    REMOVE_MESSAGE: 'REMOVE_MESSAGE'
  }
  
  export const addMessage = (message) => ({
    type: MessageActions.ADD_MESSAGE,
    message
  })
  
  export const removeMessage = (message) => ({
    type: MessageActions.REMOVE_MESSAGE,
    message
  })
  
  