interface IProps {
    course: string;
}

const Header = ({ course }: IProps) => {
    return <h1>{ course }</h1>
};

export default Header;