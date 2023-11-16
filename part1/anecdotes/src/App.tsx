import { useState } from 'react'
import Anecdote from './components/Anecdote'

const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
]
  
const App = () => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState<number[]>(new Array(anecdotes.length).fill(0));

  const getRandomAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  }

  const updateVotes = () => {
    setVotes(prevVotes => {
      const newVotes = [...prevVotes];
      newVotes[selected] += 1;
      return newVotes;
    });
  }

  const getIndexOfMostVotes = () => {
    let index = 0, max = 0;

    for (let i = 0; i < votes.length; i++) {
      if (votes[i] > max) {
        max = votes[i];
        index = i;
      }
    }

    return index;
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote text={anecdotes[selected]} votes={votes[selected]} />
      <div>
        <button onClick={updateVotes}>Vote</button>
        <button onClick={getRandomAnecdote}>Next</button>
      </div>
      <h1>Anecdote with most votes</h1>
      <Anecdote text={anecdotes[getIndexOfMostVotes()]} votes={votes[getIndexOfMostVotes()]} />
    </div>
  )
}

export default App