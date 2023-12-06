import { useDispatch, useSelector } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'

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
    console.log('aenc: ', anecdotes);
    if (filter === '') {
      return anecdotes;
    } else {
      return anecdotes.filter(anec => anec.content.toLowerCase().includes(filter.toLowerCase()))
    }
  })

  return(
    <ul>
      {anecdotes.sort((a, b) => b.votes - a.votes).map(anec =>
        <Anecdote
          key={anec.id}
          anecdote={anec}
          handleVote={() => 
            dispatch(voteForAnecdote(anec.id))
          }
        />
      )}
    </ul>
  )
}

export default Anecdotes