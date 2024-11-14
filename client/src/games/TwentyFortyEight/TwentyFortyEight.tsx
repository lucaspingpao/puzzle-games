import { useState, useEffect } from 'react';
import Square from './Square';
import { Button, TextInput } from 'flowbite-react';
import Leaderboard from '../../components/Leaderboard';
import TimerDisplay from '../../components/TimerDisplay';
import useTimer from '../../hooks/useTimer';
import useLeaderboard from '../../hooks/useLeaderboard';

function TwentyFortyEight() {
    const INITIAL_GAME_SIZE = 5;
    const [gameSize, setGameSize] = useState<number>(INITIAL_GAME_SIZE);
    const [squares, setSquares] = useState<string[][]>([]);
    const [result, setResult] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [score, setScore] = useState<number>(0);
    const [nextSquare, setNextSquare] = useState<number[]>([]);
    
    const { time, setTime, isRunning, setIsRunning } = useTimer();
    const { leaderboardData, postData } = useLeaderboard('twentyfortyeight');

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setSubmitted(true);
        const newEntry = {
            username,
            mode: `${gameSize}x${gameSize}`,
            score,
            time_ms: time,
        }
        postData(newEntry);
    }

    useEffect(() => {
        resetBoard(INITIAL_GAME_SIZE);
    }, []);

    useEffect(() => {
        if (isRunning && result.length === 0) {
            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    moveUp();
                } else if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    moveDown();
                } else if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    moveLeft();
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    moveRight();
                }
            };

            window.addEventListener('keydown', handleKeyDown);

            return () => {
                window.removeEventListener('keydown', handleKeyDown);
            };
        }
    }, [squares]);

    const collapse = (arr: string[]): string[] => {
        let ptr = 0;
        let res = [...arr].filter((val) => val !== '');
        let addScore = 0;
        while (ptr < res.length - 2) {
            if (res[ptr] === res[ptr + 1] && res[ptr + 1] === res[ptr + 2]) {
                const val = Number(res[ptr]) * 3;
                res[ptr] = String(val);
                res.splice(ptr + 1, 2);
                addScore += val;
            }
            ptr += 1;
        }
        while (res.length < gameSize) {
            res.push('');
        }
        setScore((curr) => curr + addScore);
        return res;
    }

    const moveLeft = () => {
        const newSquares = [...squares];
        for (let i = 0; i < gameSize; i++) {
            newSquares[i] = collapse(newSquares[i]);
        }
        generateNumber(newSquares);
    }

    const moveRight = () => {
        const newSquares = [...squares];
        for (let i = 0; i < gameSize; i++) {
            let newRow = collapse([...newSquares[i]].reverse());
            newRow.reverse();
            newSquares[i] = newRow;
        }
        generateNumber(newSquares);
    }

    const moveUp = () => {
        const newSquares = [...squares];
        for (let i = 0; i < gameSize; i++) {
            let col = [];
            for (let j = 0; j < gameSize; j++) {
                col.push(newSquares[j][i]);
            }
            let newCol = collapse(col);
            for (let k = 0; k < gameSize; k++) {
                newSquares[k][i] = newCol[k];
            }
        }
        generateNumber(newSquares);
    }

    const moveDown = () => {
        const newSquares = [...squares];
        for (let i = 0; i < gameSize; i++) {
            let col = [];
            for (let j = 0; j < gameSize; j++) {
                col.unshift(newSquares[j][i]);
            }
            let newCol = [...collapse(col).reverse()];
            for (let k = 0; k < gameSize; k++) {
                newSquares[k][i] = newCol[k];
            }
        }
        generateNumber(newSquares);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsRunning(false);
        setTime(0);
        let newSize = parseInt(e.target.value);
        setGameSize(newSize);
        resetBoard(newSize);
    }

    const startGame = () => {
        setTime(0);
        setIsRunning(true);
        setResult('');
        const emptySquares = resetBoard(gameSize);
        generateNumber(emptySquares);
    }

    const resetBoard = (dim: number): string[][] => {
        const emptySquares = Array.from({ length: dim }, () => 
            Array.from({ length: dim }, () => (''))
        )
        setSquares(emptySquares);
        return emptySquares;
    }

    const gameOver = (sqs: string[][]): boolean => {
        for (let i = 0; i < gameSize; i++) {
            for (let j = 0; j < gameSize; j++) {
                if (j + 2 < gameSize) {
                    if (sqs[i][j] === sqs[i][j + 1] && sqs[i][j + 1] === sqs[i][j + 2]) {
                        return false;
                    }
                }
                
                if (i + 2 < gameSize) {
                    if (sqs[i][j] === sqs[i + 1][j] && sqs[i + 1][j] === sqs[i + 2][j]) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    const generateNumber = (sqs: string[][]) => {
        let openSquares: [number, number][] = [];
        sqs.forEach((row, i) => {
            row.forEach((col, j) => {
                if (!col) openSquares.push([i, j]);
            });
        });

        if (openSquares.length === 0) {
            setSquares(sqs);
            return;
        }

        const randomIndex = Math.floor(Math.random() * openSquares.length);
        const [row, col] = openSquares[randomIndex];
        sqs[row][col] = Math.random() < 0.9 ? '3': '9';
        setNextSquare([row, col]);
        console.log(nextSquare)

        if (openSquares.length === 1 && gameOver(sqs)) {
            setIsRunning(false);
            setResult('Game over!');
        }

        setSquares(sqs);
    }

    return (
        <div>
            <h1 className="text-5xl py-10 text-center">2187</h1>
            <div className="grid grid-cols-1 lg:mx-10 xl:mx-20 lg:grid-cols-2">
                <div className="flex flex-col items-center">
                    <div className="">Score: {score}</div>
                    <TimerDisplay time={time}/>
                    <div className="">
                        {squares.map((row, r) => {
                            return (
                                <div style={{display: 'flex'}} key={r}>
                                    {row.map((col, c) => {
                                        return (
                                            <Square
                                                key={c}
                                                value={col}
                                                new={r === nextSquare[0] && c === nextSquare[1]}
                                                loc = {[r, c]}
                                            />
                                        )
                                    })}
                                </div>
                            )})
                        }
                    </div>
                    
                    
                    <label className="mt-4" htmlFor="board-size">Board Size: {gameSize}</label>
                    <input
                        id="board-size"
                        type="range"
                        min={3}
                        max={8}
                        value={gameSize}
                        onChange={handleInputChange}
                    />
                    <Button className="my-4" onClick={startGame} disabled={isRunning || result.length > 0}>Start Game</Button>

                    <h2 className='mt-4'>{result}</h2>
                    {result && 
                        <form className="flex flex-col pb-10">
                            <h2>Submit your score to the leaderboard!</h2>
                            <div className='flex flex-row my-2'>
                                <TextInput
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Username"
                                    required
                                />
                                <Button type="submit" onClick={handleSubmit} disabled={submitted}>Submit</Button>
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

export default TwentyFortyEight;