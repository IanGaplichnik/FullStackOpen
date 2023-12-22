import { useDispatch, useSelector } from "react-redux"
import { addVote } from "../reducers/anecdoteReducer"
import { resetNotificationMessage, setNotificationMessage } from "../reducers/notificationReducer"

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
    dispatch(addVote(anecdote.id))
    dispatch(setNotificationMessage(`You voted '${anecdote.content}'`))
    setTimeout(() => dispatch(resetNotificationMessage()), 5000)
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
