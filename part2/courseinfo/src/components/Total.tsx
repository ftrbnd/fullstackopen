import { IPart } from "../App";

interface IProps {
    parts: IPart[]
}

const Total = ({ parts }: IProps) => {
    const getTotal = () => {
        return parts.reduce((prevTotal, curPart) => {
            return prevTotal + curPart.exercises;
        }, 0);
    }

    return <strong>Total exercises: {getTotal()}</strong>
};

export default Total;