import { IPart } from "../App";

interface IProps {
    part: IPart
}

const Part = (props: IProps) => {
    return <p >{props.part.name} {props.part.exercises}</p>
};

export default Part;