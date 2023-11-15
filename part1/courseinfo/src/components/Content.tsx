import { IPart } from "../App";
import Part from "./Part";

interface IProps {
    parts: IPart[]
}

const Content = (props: IProps) => {
    return <div>
        {props.parts.map((part) => <Part key={part.name} part={part} />)}
    </div>
};

export default Content;