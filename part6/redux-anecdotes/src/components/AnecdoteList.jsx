import { useDispatch, useSelector } from 'react-redux'
import { initializeAnecdotes, voteForAnecdote } from '../reducers/anecdoteReducer'
import { displayNotification } from '../reducers/notificationReducer'
import { useEffect } from 'react'

const Anecdote = ({ anecdote, handleVote }) => {
  return(
    <li key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleVote}>vote</button>
      </div>
    </li>
  )
}

const Anecdotes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter === '') {
      return anecdotes;
    } else {
      return anecdotes.filter(anec => anec.content.toLowerCase().includes(filter.toLowerCase()))
    }
  })

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [])
  
  const handleVote = (anecdote) => {
    dispatch(voteForAnecdote(anecdote));
    dispatch(displayNotification(`You voted for "${anecdote.content}"`, 3))
  }

  return(
    <ul>
      {anecdotes.map(anec =>
        <Anecdote
          key={anec.id}
          anecdote={anec}
          handleVote={() => handleVote(anec)}
        />
      )}
    </ul>
  )
}

export default Anecdotes