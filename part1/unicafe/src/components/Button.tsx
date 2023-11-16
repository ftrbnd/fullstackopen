
interface IProps {
    handleClick: () => void;
    text: string;
}

const Button = ({handleClick, text}: IProps) => {
    return <button onClick={handleClick}>{text}</button>
};

export default Button;