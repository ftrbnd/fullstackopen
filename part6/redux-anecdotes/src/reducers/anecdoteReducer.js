import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload);
      return state;
    },
    voteForAnecdote(state, action) {
      const anecdoteToChange = state.find(a => a.id === action.payload);
      const changedAnecdote = { 
        ...anecdoteToChange, 
        votes: anecdoteToChange.votes + 1
      };

      return state.map(anecdote =>
        anecdote.id !== action.payload ? anecdote : changedAnecdote 
      );
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(_state, action) {
      return action.payload
    }
  }
})

export const { createAnecdote, voteForAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer