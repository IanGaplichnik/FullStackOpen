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
  const positiveStat = (good / total * 100) + "%"

  if (total === 0) {
    return <p>No feedback given</p>
  }
  return (
    <>
      <StatisticLine text={GoodStr} value={good}></StatisticLine>
      <StatisticLine text={NeutralStr} value={neutral}></StatisticLine>
      <StatisticLine text={BadStr} value={bad}></StatisticLine>
      <StatisticLine text={AllStr} value={good + bad + neutral}></StatisticLine>
      <StatisticLine text={AverageStr} value={(good - bad) / total}></StatisticLine>
      <StatisticLine text={PositiveStr} value={positiveStat}></StatisticLine >
    </>
  )
}

const Header = ({ text }) => <h1>{text}</h1>

const StatisticLine = ({ text, value }) => <p>{text} {value}</p>

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
