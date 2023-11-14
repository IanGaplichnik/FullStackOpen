import { useState } from "react"
import FullCountrySpecs from "./FullCountrySpecs"


const CountriesList = ({ country }) => {
  const [showCountry, setShowCountry] = useState(false)

  const ShowCountrySwitch = () => () => {
    setShowCountry(!showCountry)
  }

  return (
    <li key={country.name.common}>
      {showCountry ? <FullCountrySpecs country={country} /> : country.name.common} <button onClick={ShowCountrySwitch()}>{showCountry ? "hide" : "show"}</button>
    </li>
  )
}

export default CountriesList
