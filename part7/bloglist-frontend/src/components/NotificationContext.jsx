// const { createContext, useReducer } = require('react')
import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SUCCESS':
      console.log('here')
      return { msg: action.payload, status: 'success' }
    case 'SET_FAILURE':
      return { msg: action.payload, status: 'failure' }
    case 'RESET':
      return { msg: null, status: 'failure' }
    default:
      return state
  }
}

export const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, dispatchNotification] = useReducer(notificationReducer, {
    msg: null,
    status: 'failure',
  })

  return (
    <NotificationContext.Provider
      value={{ notification, dispatchNotification }}
    >
      {props.children}
    </NotificationContext.Provider>
  )
}
