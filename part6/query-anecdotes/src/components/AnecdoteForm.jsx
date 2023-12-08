import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../services/requests"
import { useNotificationDispatch } from "../hooks/useNotification"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()

  const onCreate = (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    newAnecdoteMutation.mutate(content)
  }
  
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onError: (err) => {
      if (err.response.data.error) {
        notificationDispatch({ type: 'SET', payload: err.response.data.error })
      } else {
        notificationDispatch({ type: 'SET', payload: err.message })
      }

      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR' })
      }, 5000);
    },
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))

      notificationDispatch({ type: 'SET', payload: `Created anecdote "${newAnecdote.content}"`})
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR' })
      }, 5000);
    }
  })

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
