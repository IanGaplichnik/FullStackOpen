import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    addVote(state, action) {
      const id = action.payload
      const anecdoteWithVote = state.find((anecdote) => anecdote.id === id)
      anecdoteWithVote.votes += 1
      state.map((anecdote) =>
        anecdote.id === id ? anecdoteWithVote : anecdote
      )
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const { addVote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotesService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteForAnecdote = (anecdoteWithVote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdotesService.likeAnecdote(
      anecdoteWithVote
    )
    dispatch(addVote(updatedAnecdote.id))
  }
}
