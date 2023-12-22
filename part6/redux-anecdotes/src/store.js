import { configureStore } from '@reduxjs/toolkit'
import anecdotesReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'

const store = configureStore({
  reducer: {
    anecdotes: anecdotesReducer,
    filterKey: filterReducer,
  },
})

export default store
