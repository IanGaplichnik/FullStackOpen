import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, voteForAnecdote } from './requests'
import { useNotificationDispatch } from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()
  const updateAnecdoteMutation = useMutation({
    mutationFn: voteForAnecdote,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['anecdotes'] }) }
  })

  const handleVote = (anecdote) => {
    console.log('vote')
    const anecdoteWithVote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    updateAnecdoteMutation.mutate(anecdoteWithVote)
    dispatch({ type: 'SET', payload: `You have voted for '${anecdote.content}' anecdote` })
    setTimeout(() => dispatch({ type: 'RESET' }), 5000)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })

  if (result.isLoading)
    return <div>loading data...</div>
  if (result.isError)
    return <div>Anecdote service not available due to server problem</div>

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
