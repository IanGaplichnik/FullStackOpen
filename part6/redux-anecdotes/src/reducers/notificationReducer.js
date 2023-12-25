import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotificationMessage(state, action) {
      return action.payload
    },
    resetNotificationMessage() {
      return null
    },
  },
})

export const { setNotificationMessage, resetNotificationMessage } =
  notificationSlice.actions
export default notificationSlice.reducer

export const setNotification = (message, time) => {
  return (dispatch) => {
    dispatch(setNotificationMessage(message))
    setTimeout(() => dispatch(resetNotificationMessage()), time)
  }
}
