
interface IProps {
    text: string;
    value: number;
}

const Statistic = ({text, value}: IProps) => {
    return (
        <>
            <tr>
                <td>{text}</td>
                <td>{value}</td>
            </tr>
        </>
    )
};

export default Statistic;