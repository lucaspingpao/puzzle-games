import { useState, useEffect } from 'react'
import Row from './Row';

function Wordle() {
    const [answer, setAnswer] = useState<string>('LUCAS')
    const [guesses, setGuesses] = useState<string[]>(Array(6).fill(''))
    const [currRow, setCurrRow] = useState<number>(0)
    const [result, setResult] = useState<string>('')

    const handleKeyPress = (e: KeyboardEvent) => {
        let currWord = guesses[currRow]
        if (e.key == 'Backspace') {
            currWord = currWord.slice(0, -1)
        } else if (/^[a-zA-Z]$/.test(e.key)) {
            currWord = currWord + e.key.toUpperCase()
        } else {
            return
        }

        const newGuesses = [...guesses]
        newGuesses[currRow] = currWord
        setGuesses(newGuesses)

        if (currWord.length == 5) {
            setCurrRow((r) => r + 1)
            if (currWord === answer) {
                setResult('You won!')
            } else if (currRow == 5) {
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
        <div className='flex flex-col px-10 items-center'>
            <h1 className='text-5xl py-10'>Wordle</h1>
            {guesses.map((str, idx) => {
                return (
                    <Row key={idx} value={str} answer={answer}/>
                )
            })}
            <h2 className='mt-4'>{result}</h2>
        </div>
    )
}

export default Wordle