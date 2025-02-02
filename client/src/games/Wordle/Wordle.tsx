import { useState, useEffect } from 'react';
import { Button, TextInput } from "flowbite-react";
import Row from './Row';
import Leaderboard from '../../components/Leaderboard';
import Key from './Key';
import FIVE_LETTER_WORDS from '../../constants/fiveLetterWords';
import TimerDisplay from '../../components/TimerDisplay';
import useTimer from '../../hooks/useTimer';
import useLeaderboard from '../../hooks/useLeaderboard';

function Wordle() {
    const [answer, setAnswer] = useState<string>('');
    const [guesses, setGuesses] = useState<string[]>(Array(6).fill(''));
    const [currRow, setCurrRow] = useState<number>(0);
    const [result, setResult] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [submitted, setSubmitted] = useState<boolean>(false);
    
    const { time, isRunning, setIsRunning } = useTimer();
    const { leaderboardData, postData } = useLeaderboard('wordle');

    const getRandomWord = (words: Set<string>): string => {
        const randomIndex = Math.floor(Math.random() * words.size);
        return Array.from(words)[randomIndex].toUpperCase();
    };
    
    useEffect(() => {
        if (answer.length === 0) {
            setAnswer(getRandomWord(FIVE_LETTER_WORDS));
        }

        if (!result) {
            window.addEventListener('keydown', handleKeyPress);
            return () => window.removeEventListener('keydown', handleKeyPress)
        }
    }, [guesses]);

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setSubmitted(true);
        const newEntry = {
            username,
            mode: '5x6',
            score: 6 - guesses.filter(str => str.length > 0).length,
            time_ms: time,
        }
        postData(newEntry);
    }

    const handleKey = (key: string, backspace: string) => {
        let currWord = guesses[currRow];
        if (key == backspace) {
            currWord = currWord.slice(0, -1);
        } else if (/^[a-zA-Z*]$/.test(key) && currWord.length < 5) {
            currWord = currWord + key.toUpperCase();
        } else {
            return;
        }

        if (!isRunning) {
            setIsRunning(true);
        }

        const newGuesses = [...guesses];
        newGuesses[currRow] = currWord;
        setGuesses(newGuesses);

        if (currWord.length == 5 && FIVE_LETTER_WORDS.has(currWord.toLowerCase())) {
            setCurrRow((r) => r + 1);
            if (currWord === answer) {
                setIsRunning(false);
                setResult('You won!');
            } else if (currRow == 5) {
                setIsRunning(false);
                setResult('You lost!');
            }
        }
    };

    const handleKeyPress = (e: KeyboardEvent) => {
        handleKey(e.key, 'Backspace');
    };

    return (
        <div>
            <h1 className='text-5xl py-10 text-center'>WordHole</h1>
            <div className='grid grid-cols-1 lg:mx-10 xl:mx-20 lg:grid-cols-2'>
                <div className="flex flex-col items-center">
                    <TimerDisplay time={time}/>
                    <div className='board-rows mb-10 mx-auto'>
                        {guesses.map((str, idx) => {
                            return (
                                <Row
                                    key={idx}
                                    value={str}
                                    answer={answer}
                                    valid={FIVE_LETTER_WORDS.has(str.toLowerCase())}
                                />
                            );
                        })}
                    </div>

                    <div className='flex flex-col items-center'>
                        <div className='px-2 flex'>
                            {"QWERTYUIOP".split("").map((chr) => {
                                return <Key key={chr} letter={chr} onClick={() => handleKey(chr, '⌫')} />;
                            })}
                        </div>
                        <div className='px-10 flex'>
                            {"ASDFGHJKL".split("").map((chr) => {
                                return <Key key={chr} letter={chr} onClick={() => handleKey(chr, '⌫')} />;
                            })}
                        </div>
                        <div className='px-10 flex'>
                            {"ZXCVBNM*⌫".split("").map((chr) => {
                                return <Key key={chr} letter={chr} onClick={() => handleKey(chr, '⌫')} />;
                            })}
                        </div>
                    </div>

                    <h2 className='result-message mt-4'>{result}</h2>
                    {result === 'You won!' &&
                        <form className="flex flex-col pb-10">
                            <h2>Submit your score to the leaderboard!</h2>
                            <div className='flex flex-row my-2'>
                                <TextInput
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Username"
                                    required
                                />
                                <Button type="submit" disabled={submitted} onClick={handleSubmit}>Submit</Button>
                            </div>
                        </form>
                    }
                    {result && <Button onClick={() => location.reload()}>Try Again</Button>}
                </div>
                <Leaderboard data={leaderboardData}/>
            </div>
        </div>
    )
}

export default Wordle;