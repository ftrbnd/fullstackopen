import { useState } from "react"
import Button from "./components/Button"
import Statistic from "./components/Statistic"

interface AllStatisticsProps {
  good: number;
  neutral: number;
  bad: number;
}

const AllStatistics = ({ good, neutral, bad }: AllStatisticsProps) => {
  return (
    <table>
      <tbody>
        <Statistic text="Good" value={good} />
        <Statistic text="Neutral" value={neutral} />
        <Statistic text="Bad" value={bad} />
        <Statistic text="All" value={good + neutral + bad} />
        <Statistic text="Average" value={((good * 1) + (neutral * 0) + (bad * -1)) / 3} />
        <Statistic text="Positive" value={(good / (good + neutral + bad)) * 100} />
      </tbody>
    </table>
  )
}

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  return (
    <div>
      <h1>Give Feedback</h1>
      <div>
        <Button handleClick={() => setGood(prev => prev + 1)} text="Good" />
        <Button handleClick={() => setNeutral(prev => prev + 1)} text="Neutral"/>
        <Button handleClick={() => setBad(prev => prev + 1)} text="Bad"/>
      </div>
      <h1>Statistics</h1>
      {(good || neutral || bad)
        ? <AllStatistics good={good} neutral={neutral} bad={bad} />
        : <p>No feedback given</p>}
      
    </div>
  )
}

export default App
