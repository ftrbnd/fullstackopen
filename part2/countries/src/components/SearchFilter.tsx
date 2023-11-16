import { ChangeEvent, useState } from "react";
import { ICountry } from "../App";

interface IProps {
    countries: ICountry[];
    setFilteredCountries: (results: ICountry[]) => void;
}

const SearchFilter = ({ countries, setFilteredCountries }: IProps) => {
    const [searchInput, setSearchInput] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
        setFilteredCountries(countries.filter(country => country.name.common.toLowerCase().includes(e.target.value)));
    }

    return (
        <div>
            <p>Find countries: </p>
            <input value={searchInput} onChange={e => handleChange(e)} />
        </div>
    )

};

export default SearchFilter;