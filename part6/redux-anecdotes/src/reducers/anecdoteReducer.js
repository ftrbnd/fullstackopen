import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(_state, action) {
      return action.payload
    },
    editAnecdote(state, action) {
      const anecdoteToChange = state.find(a => a.id === action.payload.id);
      const changedAnecdote = { 
        ...anecdoteToChange, 
        votes: anecdoteToChange.votes + 1
      };

      return state.map(anecdote =>
        anecdote.id !== action.payload.id ? anecdote : changedAnecdote 
      );
    }
  }
})

export const { appendAnecdote, setAnecdotes, editAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteForAnecdote = anecdote => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.vote(anecdote)
    dispatch(editAnecdote(newAnecdote))
  }
}

export default anecdoteSlice.reducer