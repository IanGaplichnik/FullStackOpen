import { useDispatch, useSelector } from "react-redux"
import { voteForAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filterKey, anecdotes }) => {
    const filteredAnecdotes = anecdotes
      .filter((anecdote) => anecdote.content.toLowerCase().includes(filterKey.toLowerCase()))
    return filteredAnecdotes
      .sort((a, b) => b.votes - a.votes)
  })

  const dispatch = useDispatch()

  const vote = (anecdote) => {
    console.log('vote', anecdote.id)
    const anecdoteWithVote = { ...anecdote, votes: anecdote.votes + 1 }
    dispatch(voteForAnecdote(anecdoteWithVote))
    dispatch(setNotification(`You voted '${anecdote.content}'`, 5000))
  }

  return (
    anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
    )
  )
}

export default AnecdoteList
