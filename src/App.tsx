import { useEffect, useState } from 'react'
import './App.css'
import { QUESTIONS } from './questions'
import QuestionCard from './components/QuestionCard';
function App() {


  const [keys, setKeys] = useState<string[]>([]);
  const [answers, setAnswers] = useState<{ [key: number]: string }>();
  const [score, setScore] = useState<number>(-1);
  const [avgScore, setAvgScore] = useState<any>(0);

  useEffect(() => {
    setKeys(Object.keys(QUESTIONS));
    const aa = localStorage.getItem("avgScore") || '0';
    setAvgScore(parseInt(aa))
  }, [])


  const calculateScore = () => {
    let calculatedScore = 0;
    keys.forEach(key => {
      if (answers && answers[parseInt(key)] === "YES")
        calculatedScore++;
    })

    const calculatedPercentage = 100 * calculatedScore / keys.length;
    setScore(calculatedPercentage)

    const newAvgScore = avgScore ? ((avgScore + calculatedPercentage) / 2) : calculatedPercentage;
    setAvgScore(newAvgScore)
    localStorage.setItem("avgScore", newAvgScore.toString())
  }

  const handleRadioButtonClick = (id: number, value: string) => {
    setAnswers({ ...answers, [id]: value })
    setScore(-1)
  }


  return (
    <>
      <div className='header'>
        <div className='title'>
          Questions
        </div>
        <div className='sub-title'>
          Average Score: {avgScore || '-'}%
        </div>
      </div>

      {keys.map((key) =>
        <QuestionCard key={key} id={key} question={QUESTIONS[parseInt(key)]} handleRadioButtonClick={handleRadioButtonClick} />
      )}
      <div className='text-align-center'>


        {score === -1 ?
          <button onClick={calculateScore}>Submit</button>
          : <div className='score-text'>
            Your score is: {score} %
          </div>
          }
      </div>
    </>
  )
}

export default App
