import { Dispatch, SetStateAction } from "react";
import { IPerson } from "../App";
import { deletePerson } from "../services/persons";

interface IProps {
    person: IPerson;
    setPersons: Dispatch<SetStateAction<IPerson[]>>;
    setNotificationMessage: Dispatch<SetStateAction<string>>;
    setNotificationSuccess: Dispatch<SetStateAction<boolean>>;
}

const Person = ({ person, setPersons, setNotificationMessage, setNotificationSuccess }: IProps) => {
    const handleClick = () => {
        if (!person.id) return alert('Person does not have an id');

        const confirmDelete = confirm(`Delete ${person.name}?`);
        if (confirmDelete) {
            deletePerson(person.id)
                .then(() => {
                    setPersons(prevPersons => prevPersons.filter(prevPerson => prevPerson.id !== person.id))
                    setNotificationMessage(`Deleted ${person.name}`);
                    setNotificationSuccess(true);
                })
                .catch((err) => {
                    console.error(err);
                    setNotificationMessage(`Failed to delete ${person.name ?? 'person'}`);
                    setNotificationSuccess(false);
                });
        }
    }

    return (
        <li>
            <p>{person.name}: {person.number}</p>
            <button onClick={handleClick}>Delete</button>
        </li>
    )
};

export default Person;