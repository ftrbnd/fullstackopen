import { IPart } from "../App";

interface IProps {
    parts: IPart[]
}

const Total = (props: IProps) => {
    const getTotal = () => {
        let total = 0;

        for (const part of props.parts) {
            total += part.exercises;
        }
        return total;
    }

    return <p>Number of exercises {getTotal()}</p>
};

export default Total;