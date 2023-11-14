import axios from 'axios'
import { useEffect, useState } from 'react'
import CountriesBody from './components/CountriesBody'

function App() {
  const [filterKey, setFilterKey] = useState('')
  const [country, setCountry] = useState(null)
  const [allCountries, setAllCountries] = useState(null)

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setAllCountries(response.data)
        console.group(response.data)
      })
  }, [])

  const onInputChange = (event) => {
    setFilterKey(event.target.value)
  }

  const onSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        find countries <input value={filterKey} onChange={onInputChange}></input>
      </form>
      <CountriesBody allCountries={allCountries} filterKey={filterKey} />
    </>
  )
}

export default App
