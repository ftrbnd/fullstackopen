interface IProps {
    course: string;
}

const Header = (props: IProps) => {
    return <h1>{props.course}</h1>
};

export default Header;