import { IPart } from "../App";

interface IProps {
    part: IPart
}

const Part = ({ part }: IProps) => {
    return <p >{part.name}: {part.exercises}</p>
};

export default Part;