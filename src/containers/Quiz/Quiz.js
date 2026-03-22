import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import axios from '../../axios/axios-quiz'
import Loader from '../../components/UI/Loader/Loader'

const Quiz = () => {
  const { id } = useParams()
  const [results, setResults] = useState({})
  const [isFinished, setIsFinished] = useState(false)
  const [activeQuestion, setActiveQuestion] = useState(0)
  const [answerState, setAnswerState] = useState(null)
  const [quiz, setQuiz] = useState(null)
  const [loading, setLoading] = useState(true)

  const onAnswerClickHandler = answerId => {
    if (answerState) {
      const key = Object.keys(answerState)[0]
      if (answerState[key] === 'success') {
        return
      }
    }

    if (!quiz) return

    const question = quiz[activeQuestion]
    const newResults = { ...results }

    if (question.rightAnswerId === answerId) {
      if (!newResults[question.id]) {
        newResults[question.id] = 'success'
      }

      setAnswerState({ [answerId]: 'success' })
      setResults(newResults)

      const timeout = window.setTimeout(() => {
        if (activeQuestion + 1 === quiz.length) {
          setIsFinished(true)
        } else {
          setActiveQuestion(activeQuestion + 1)
          setAnswerState(null)
        }
        window.clearTimeout(timeout)
      }, 1000)
    } else {
      newResults[question.id] = 'error'
      setAnswerState({ [answerId]: 'error' })
      setResults(newResults)
    }
  }

  const retryHandler = () => {
    setActiveQuestion(0)
    setAnswerState(null)
    setIsFinished(false)
    setResults({})
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/quiz/${id}.json`)
        setQuiz(response.data)
        setLoading(false)
      } catch (e) {
        console.log(e)
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  return (
    <div className={classes.Quiz}>
      <div className={classes.QuizWrapper}>
        <h1>Ответьте на все вопросы</h1>

        {
          loading || !quiz
            ? <Loader />
            : isFinished
              ? <FinishedQuiz
                  results={results}
                  quiz={quiz}
                  onRetry={retryHandler}
                />
              : <ActiveQuiz
                  answers={quiz[activeQuestion]?.answers || []}
                  question={quiz[activeQuestion]?.question || ''}
                  onAnswerClick={onAnswerClickHandler}
                  quizLength={quiz.length}
                  answerNumber={activeQuestion + 1}
                  state={answerState}
                />
        }
      </div>
    </div>
  )
}

export default Quiz