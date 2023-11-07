import { useState } from 'react'

const GoodStr = "good"
const NeutralStr = "neutral"
const BadStr = "bad"
const AllStr = "all"
const AverageStr = "average"
const PositiveStr = "positive"

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>
    {text}
  </button >
}

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad


  return (
    <>
      <Stats name={GoodStr} number={good}></Stats>
      <Stats name={NeutralStr} number={neutral}></Stats>
      <Stats name={BadStr} number={bad}></Stats>
      <Stats name={AllStr} number={good + bad + neutral}></Stats>
      <p>{AverageStr} {(good - bad) / total}</p>
      <p>{PositiveStr} {good / total * 100}%</p>
    </>
  )
}

const Header = ({ text }) => <h1>{text}</h1>

const Stats = ({ name, number }) => <p>{name} {number}</p>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setNewStat = (oldValue, setNewFunc) => () => setNewFunc(oldValue + 1)

  return (
    <div>
      <Header text="give feedback"></Header>
      <Button onClick={setNewStat(good, setGood)} text={GoodStr}></Button>
      <Button onClick={setNewStat(neutral, setNeutral)} text={NeutralStr}></Button>
      <Button onClick={setNewStat(bad, setBad)} text={BadStr}></Button>
      <Header text="statistics"></Header>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

export default App
