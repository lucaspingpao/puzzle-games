import { useState, useEffect } from 'react'
import { Button, Checkbox, Label, TextInput } from "flowbite-react"
import Row from './Row'
import Leaderboard from '../../components/Leaderboard'
import useTimer from '../../hooks/userTimer'

function Wordle() {
    const [answer, setAnswer] = useState<string>('LUCAS')
    const [guesses, setGuesses] = useState<string[]>(Array(6).fill(''))
    const [currRow, setCurrRow] = useState<number>(0)
    const [result, setResult] = useState<string>('')
    const { time, isRunning, setIsRunning } = useTimer()

    const leaderboardData = [
        { ranking: 1, username: 'Silver', score: '6x6', time: '0:30' },
        { ranking: 2, username: 'Black', score: '6x6', time: '0:35' },
        { ranking: 3, username: 'White', score: '6x6', time: '0:37' },
    ]

    const handleKeyPress = (e: KeyboardEvent) => {
        let currWord = guesses[currRow]
        if (e.key == 'Backspace') {
            currWord = currWord.slice(0, -1)
        } else if (/^[a-zA-Z*]$/.test(e.key)) {
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

        if (currWord.length == 5) {
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

    useEffect(() => {
        setAnswer('LUCAS')
        if (!result) {
            window.addEventListener('keydown', handleKeyPress);
            return () => window.removeEventListener('keydown', handleKeyPress)
        }
    }, [guesses]);

    return (
        <div>
            <h1 className='text-5xl py-10 text-center'>WordHole</h1>
            <div className='container m-auto grid grid-cols-2'>
                <div className="flex flex-col items-center">
                    <div className="my-4">
                        <h1>Timer: {(time / 1000).toFixed(2)}s</h1>
                    </div>
                    <div className='flex flex-col px-10 items-center'>
                        {guesses.map((str, idx) => {
                            return (
                                <Row key={idx} value={str} answer={answer}/>
                            )
                        })}
                        <h2 className='mt-4'>{result}</h2>
                        {result === 'You won!' && 
                            <form className="flex flex-col pb-10">
                                <h2>Submit your score to the leaderboard!</h2>
                                <div className='flex flex-row my-2'>
                                    <TextInput placeholder="Username" required /> 
                                    <Button type="submit">Submit</Button>
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