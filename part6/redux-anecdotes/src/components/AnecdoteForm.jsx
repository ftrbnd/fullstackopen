import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { removeNotification, setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    dispatch(createAnecdote(content))
    dispatch(setNotification(`Created new anecdote: "${content}"`))

    setTimeout(() => {
        dispatch(removeNotification())
      }, 5000)
  }

  return (
    <form onSubmit={addAnecdote}>
      <h2>create new</h2>
      
      <input name="anecdote" />
      <button type="submit">add</button>
    </form>
  )
}

export default AnecdoteForm