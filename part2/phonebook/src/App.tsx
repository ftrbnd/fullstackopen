import { useEffect, useState } from 'react'
import PersonForm from './components/PersonForm';
import SearchFilter from './components/SearchFilter';
import PersonList from './components/PersonList';
import { getPersons } from './services/persons';
import Notification from './components/Notification';

export interface IPerson {
  name: string;
  number: string;
  id?: number;
}

const App = () => {
  const [persons, setPersons] = useState<IPerson[]>([])
  const [searchInput, setSearchInput] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationSuccess, setNotificationSuccess] = useState(true);

  useEffect(() => {
    getPersons()
      .then(response => setPersons(response.data))
    .catch(() => {
      alert('Failed to get persons');
    });
  }, []);

  const filteredPersons = () => {
    return persons.filter(person => person.name.toLowerCase().includes(searchInput.toLowerCase()))
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notificationMessage} success={notificationSuccess} />

      <h2>Search</h2>
      <SearchFilter searchInput={searchInput} setSearchInput={setSearchInput} />

      <h2>New Person</h2>
      <PersonForm persons={persons} setPersons={setPersons} setNotificationMessage={setNotificationMessage} setNotificationSuccess={setNotificationSuccess} />

      <h2>Numbers</h2>
      <PersonList persons={filteredPersons()} setPersons={setPersons} setNotificationMessage={setNotificationMessage} setNotificationSuccess={setNotificationSuccess} />
    </div>
  )
}

export default App