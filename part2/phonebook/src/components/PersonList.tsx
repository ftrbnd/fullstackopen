import { Dispatch, SetStateAction } from "react";
import { IPerson } from "../App";
import Person from "./Person";

interface IProps {
    persons: IPerson[];
    setPersons: Dispatch<SetStateAction<IPerson[]>>;
    setNotificationMessage: Dispatch<SetStateAction<string>>;
    setNotificationSuccess: Dispatch<SetStateAction<boolean>>;
}

const PersonList = ({ persons, setPersons, setNotificationMessage, setNotificationSuccess }: IProps) => {
    return <ul>
        {persons.map(person =>
            <Person key={person.id} person={person} setPersons={setPersons} setNotificationMessage={setNotificationMessage} setNotificationSuccess={setNotificationSuccess}  />
        )}
      </ul>
};

export default PersonList;