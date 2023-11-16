import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { IPerson } from "../App";
import { createPerson, updatePerson } from "../services/persons";

interface IProps {
    persons: IPerson[];
    setPersons: Dispatch<SetStateAction<IPerson[]>>;
    setNotificationMessage: Dispatch<SetStateAction<string>>;
    setNotificationSuccess: Dispatch<SetStateAction<boolean>>;
}

const PersonForm = ({ persons, setPersons, setNotificationMessage, setNotificationSuccess }: IProps) => {
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!newName || !newNumber) {
            return alert('Please fill out both fields')
        }

        const personExists = persons.find(person => person.name === newName);
        if (personExists && personExists.id) {
            const confirmUpdate = confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);

            if (confirmUpdate) {
                updatePerson(personExists.id, {
                    ...personExists,
                    number: newNumber
                })
                .then((response) => {
                    setPersons(persons.map(person => person.id === response.data.id ? response.data : person));
                    setNotificationMessage(`Updated ${response.data.name}`);
                    setNotificationSuccess(true);
                })
                .catch((err) => {
                    console.error(err);
                    setNotificationMessage('Failed to update person');
                    setNotificationSuccess(false);
                })
            }
        } else {
            createPerson({
                name: newName,
                number: newNumber
            })
                .then(response => {
                    setPersons(persons.concat(response.data));
                    setNotificationMessage(`Created ${response.data.name}`);
                    setNotificationSuccess(true);
                })
                .catch(() => {
                    setNotificationMessage('Failed to create person');
                    setNotificationSuccess(false);
                })
        }

        setNewName('');
        setNewNumber('');
    };

    return <form onSubmit={e => handleSubmit(e)}>
        <div>
          Name: <input value={newName} onChange={e => setNewName(e.target.value)} />
        </div>
        <div>
          Number: <input type='tel' value={newNumber} onChange={e => setNewNumber(e.target.value)} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
};

export default PersonForm;