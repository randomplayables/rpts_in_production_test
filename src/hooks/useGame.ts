import { useState, useEffect } from 'react'
import { initGameSession, saveGameData } from '../services/apiService'
import { isPrime, getRandomInt } from '../utils/math'
import { MIN_NUMBER, MAX_NUMBER } from '../constants'

const useGame = () => {
  const [sessionId, setSessionId] = useState<string>('')
  const [target, setTarget] = useState<number>(0)
  const [guesses, setGuesses] = useState<number[]>([])
  const [feedback, setFeedback] = useState<string>('')
  const [isCorrect, setIsCorrect] = useState<boolean>(false)

  const generateTarget = () => {
    let num: number
    do {
      num = getRandomInt(MIN_NUMBER, MAX_NUMBER)
    } while (!isPrime(num))
    return num
  }

  const resetGame = () => {
    setTarget(generateTarget())
    setGuesses([])
    setFeedback('')
    setIsCorrect(false)
  }

  useEffect(() => {
    const initialize = async () => {
      const sessionData = await initGameSession()
      setSessionId(sessionData.sessionId)
      setTarget(generateTarget())
    }
    initialize()
  }, [])

  const submitGuess = (guess: number) => {
    if (isCorrect) {
      return
    }
    const newGuesses = [...guesses, guess]
    setGuesses(newGuesses)

    let newFeedback = ''
    if (guess < target) {
      newFeedback = 'Too low'
    } else if (guess > target) {
      newFeedback = 'Too high'
    } else {
      newFeedback = 'Correct'
      setIsCorrect(true)
    }

    setFeedback(newFeedback)
    const roundNumber = newGuesses.length
    saveGameData(sessionId, roundNumber, { guess, feedback: newFeedback })
  }

  return {
    guesses,
    feedback,
    isCorrect,
    submitGuess,
    resetGame,
  }
}

export default useGame