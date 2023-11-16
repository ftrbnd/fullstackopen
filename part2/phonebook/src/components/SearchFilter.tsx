interface IProps {
    searchInput: string;
    setSearchInput: (searchInput: string) => void;
}

const SearchFilter = ({ searchInput, setSearchInput }: IProps) => {
    return <input value={searchInput} onChange={e => setSearchInput(e.target.value)}/>

};

export default SearchFilter;