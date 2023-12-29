import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  const [pageRendered, setRender] = useState(false)
  const url = `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`

  useEffect(() => {
    if (!pageRendered) {
      setRender(true)
      return
    }
    axios
      .get(url)
      .then((result) => {
        const newCountry = {
          ...result,
          found: true,
        }
        setCountry(newCountry)
      })
      .catch((err) => {
        const countryNotFound = {
          found: false,
        }
        setCountry(countryNotFound)
      })
  }, [name])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return <div>not found...</div>
  }

  return (
    <div>
      <h3>{country.data.name.common} </h3>
      <div>capital {country.data.capital[0]} </div>
      <div>population {country.data.population}</div>
      <img
        src={country.data.flags.png}
        height='100'
        alt={country.data.flags.alt}
      />
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
