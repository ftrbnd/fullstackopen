import axios from 'axios'
import { IPerson } from '../App'

const baseUrl = 'http://localhost:3001/persons'

const getPersons = () => {
  return axios.get<IPerson[]>(baseUrl)
}

const createPerson = (newPerson: IPerson) => {
  return axios.post<IPerson>(baseUrl, newPerson)
}

const updatePerson = (id: number, newPerson: IPerson) => {
  return axios.put<IPerson>(`${baseUrl}/${id}`, newPerson)
}

const deletePerson = (id: number) => {
    return axios.delete<IPerson>(`${baseUrl}/${id}`)
}

export { 
  getPersons,
  createPerson, 
  updatePerson,
  deletePerson
}