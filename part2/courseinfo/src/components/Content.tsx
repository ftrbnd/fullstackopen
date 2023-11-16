import { IPart } from "../App";
import Part from "./Part";

interface IProps {
    parts: IPart[]
}

const Content = ({ parts }: IProps) => {
    return <div>
        {parts.map((part) => <Part key={part.name} part={part} />)}
    </div>
};

export default Content;