import { useState, useEffect } from 'react'
import { Button, TextInput } from "flowbite-react"
import Row from './Row'
import Leaderboard from '../../components/Leaderboard'
import useTimer from '../../hooks/userTimer'
import FIVE_LETTER_WORDS from '../.././constants/fiveLetterWords'
import TimerDisplay from '../../components/TimerDisplay'

interface LeaderboardData {
    leaderboard_id: number,
    game: string,
    username: string,
    mode: string,
    score: number,
    time_ms: number
}

function Wordle() {
    const [answer, setAnswer] = useState<string>('')
    const [guesses, setGuesses] = useState<string[]>(Array(6).fill(''))
    const [currRow, setCurrRow] = useState<number>(0)
    const [result, setResult] = useState<string>('')
    const [leaderboardData, setLeaderboardData] = useState<LeaderboardData[]>([])
    const { time, isRunning, setIsRunning } = useTimer()

    useEffect(() => {
        fetch('/api/data')
        .then(response => response.json())
        .then(data => {
            setLeaderboardData(data)
        })
        .catch(error => {
            console.error('Error fetching data:', error)
        });
    })

    useEffect(() => {
        if (answer.length === 1) {
            const randomIndex = Math.floor(Math.random() * FIVE_LETTER_WORDS.size)
            setAnswer(Array.from(FIVE_LETTER_WORDS)[randomIndex].toUpperCase())
        }
        setAnswer('HELLO')

        if (!result) {
            window.addEventListener('keydown', handleKeyPress);
            return () => window.removeEventListener('keydown', handleKeyPress)
        }
    }, [guesses]);

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        const scoreData = {
            game: 'wordle',
            username: 'player1',
            mode: 'normal',
            score: 120,
            time_ms: 30000,
        };
        
        try {
            const response = await fetch('http://localhost:5001/api/leaderboard', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the content type to JSON
                },
                body: JSON.stringify(scoreData), // Convert the scoreData object to a JSON string
            });
        
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
        
            const result = await response.json(); // Parse the JSON response
            console.log('Score submitted successfully:', result);
        } catch (error) {
            console.error('Error submitting score:', error);
        }
    }

    const handleKeyPress = (e: KeyboardEvent) => {
        let currWord = guesses[currRow]
        if (e.key == 'Backspace') {
            currWord = currWord.slice(0, -1)
        } else if (/^[a-zA-Z*]$/.test(e.key) && currWord.length < 5) {
            currWord = currWord + e.key.toUpperCase()
        } else {
            return
        }

        if (!isRunning) {
            setIsRunning(true)
        }

        const newGuesses = [...guesses]
        newGuesses[currRow] = currWord
        setGuesses(newGuesses)

        if (currWord.length == 5 && FIVE_LETTER_WORDS.has(currWord.toLowerCase())) {
            setCurrRow((r) => r + 1)
            if (currWord === answer) {
                setIsRunning(false)
                setResult('You won!')
            } else if (currRow == 5) {
                setIsRunning(false)
                setResult('You lost!')
            }
        }
        console.log(guesses)
    };

    return (
        <div>
            <h1 className='text-5xl py-10 text-center'>WordHole</h1>
            <div className='container m-auto grid grid-cols-2'>
                <div className="flex flex-col items-center">
                    <TimerDisplay time={time}/>
                    <div className='flex flex-col px-10 items-center'>
                        {guesses.map((str, idx) => {
                            return (
                                <Row
                                    key={idx}
                                    value={str}
                                    answer={answer}
                                    valid={FIVE_LETTER_WORDS.has(str.toLowerCase())}
                                />
                            )
                        })}
                        <h2 className='mt-4'>{result}</h2>
                        {result === 'You won!' && 
                            <form className="flex flex-col pb-10">
                                <h2>Submit your score to the leaderboard!</h2>
                                <div className='flex flex-row my-2'>
                                    <TextInput placeholder="Username" required /> 
                                    <Button type="submit" onClick={handleSubmit}>Submit</Button>
                                </div>
                            </form>
                        }
                    </div>
                </div>
                <Leaderboard data={leaderboardData}/>
            </div>
        </div>
    )
}

export default Wordle