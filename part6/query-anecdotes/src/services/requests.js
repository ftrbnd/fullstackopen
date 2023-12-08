import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}

export const createAnecdote = async (content) => {
    const res = await axios.post(baseUrl, {
        content,
        votes: 0
    })
    return res.data
}

export const voteAnecdote = async (anecdote) => {
    const res = await axios.put(`${baseUrl}/${anecdote.id}`, {
        ...anecdote,
        votes: anecdote.votes + 1
    })
    return res.data;
}