import { useEffect, useState } from 'react'
import SearchFilter from './components/SearchFilter';
import axios from 'axios';
import Country from './components/Country';

export interface ICountry {
  name: {
    common: string;
  },
  capital: string;
  area: number;
  flags: {
    png: string;
    svg: string;
    alt: string;
  },
}

function App() {
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<ICountry[]>([]);

  useEffect(() => {
    console.log('Getting countries...');
    
    axios.get<ICountry[]>(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setCountries(response.data);
        console.log('Fetched countries');
        
      }).catch(err => {
          console.error(err);
      });
  }, []);

  const showCountry = (country: ICountry) => {
    setFilteredCountries([country]);
  }

  return (
    <div>
      <h1>Data for Countries</h1>
      <SearchFilter countries={countries} setFilteredCountries={setFilteredCountries} />
      <div>
        {filteredCountries.length >= 10
          ? <p>Too many matches, specify another filter</p>
          : filteredCountries.length === 1 ? <Country country={filteredCountries[0]} />
            : filteredCountries.map(country =>
              <div key={country.name.common}>
                <p>{country.name.common}</p>
                <button onClick={() => showCountry(country)}>Show</button>
              </div>)
        }
      </div>
    </div>
  )
}

export default App
