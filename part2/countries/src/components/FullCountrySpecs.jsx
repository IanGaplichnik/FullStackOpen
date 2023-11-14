import axios from "axios"
import { useEffect, useState } from "react"

const Languages = ({ languages }) => {
  return Object.keys(languages).map((key) => <li key={key}>{languages[key]}</li>)
}

const WeatherBlock = ({ country, weather }) => {
  const imageUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`

  return (
    <>
      <h3>Weather in {country.capital}</h3>
      <p>temperature {weather.main.temp} Celsius</p>
      <img src={imageUrl} alt="image representing weather" />
      <p>wind {weather.wind.speed} m/s</p>
    </>
  )
}

const FullCountrySpecs = ({ country }) => {
  const api_key = import.meta.env.VITE_WEATHER_API

  const [weather, setWeather] = useState(null)

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}&units=metric`)
      .then(response => { setWeather(response.data) })
  }, [])

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h3>languages:</h3>
      <ul>
        <Languages languages={country.languages} />
      </ul>
      <img src={country.flags.png} alt="Image of finnish flag" />
      {!weather ? <></> : <WeatherBlock country={country} weather={weather} />}
    </div>
  )
}

export default FullCountrySpecs
