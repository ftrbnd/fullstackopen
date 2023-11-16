import { ICountry } from "../App";

interface IProps {
    country: ICountry;
}

const Country = ({ country }: IProps) => {
    return <div>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
        <img src={country.flags.png} alt={country.flags.alt} />
    </div>
};

export default Country;