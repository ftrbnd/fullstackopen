interface IProps {
    text: string;
    votes: number;
}

const Anecdote = ({text, votes}: IProps) => {
    return (
        <>
            <p>{text}</p>
            <p>Votes: {votes}</p>
        </>
    )
};

export default Anecdote;