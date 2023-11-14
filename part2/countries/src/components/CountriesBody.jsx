import CountriesList from "./CountriesList"
import FullCountrySpecs from "./FullCountrySpecs"

const CountriesBody = ({ allCountries, filterKey }) => {
  let filteredList = []
  if (allCountries) {
    filteredList = allCountries.filter(country => country.name.common.toLowerCase().includes(filterKey.toLowerCase()))
  }

  const ifListTooBig = () => {
    if (filterKey.length === 0) {
      return <></>
    }
    if (filteredList.length === 1) {
      return <FullCountrySpecs country={filteredList[0]} />
    }
    if (filteredList.length > 10) {
      return <p>Too many matches, specify another filter</p>
    }
    return filteredList.map(country => <CountriesList key={country.name.common} country={country} />)
  }

  return (
    <>
      {ifListTooBig()}
    </>
  )
}

export default CountriesBody
