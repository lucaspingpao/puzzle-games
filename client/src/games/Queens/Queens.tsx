import { useState, useEffect } from 'react';
import Square from './Square';
import { Button, TextInput } from 'flowbite-react';
import Leaderboard from '../../components/Leaderboard';
import TimerDisplay from '../../components/TimerDisplay';
import useTimer from '../../hooks/useTimer';
import useLeaderboard from '../../hooks/useLeaderboard';

interface SquareAttributes {
    text: string,
    color: number,
}

export const containsDuplicate = (arr: string[]): boolean => {
    let set = new Set()
    for (let el of arr) {
        if (set.has(el)) {
            return true;
        } else {
            set.add(el);
        }
    }
    return false;
}

export const validateBoard = (pieces: string[], squares: SquareAttributes[][]): boolean => {
    const rows = pieces.map((coor) => coor.split('#')[0])
    const columns = pieces.map((coor) => coor.split('#')[1])
    const colors = pieces.map((coor) => {
        const [row, col] = coor.split('#');
        return String(squares[Number(row)][Number(col)].color);
    })

    if (containsDuplicate(rows) || containsDuplicate(columns) || containsDuplicate(colors)) {
        return false;
    }

    return true;
}

function Queens() {
    const INITIAL_GAME_SIZE = 5
    const [size, setSize] = useState<number>(INITIAL_GAME_SIZE);
    const [squares, setSquares] = useState<SquareAttributes[][]>([]);
    const [pieces, setPieces] = useState<string[]>([]);
    const [result, setResult] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [submitted, setSubmitted] = useState<boolean>(false);
    
    const { time, setTime, isRunning, setIsRunning } = useTimer();
    const { leaderboardData, postData } = useLeaderboard('queens');

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setSubmitted(true);
        const newEntry = {
            username,
            mode: `${size}x${size}`,
            score: 0,
            time_ms: time,
        }
        postData(newEntry);
    }

    useEffect(() => {
        initializeBoard(INITIAL_GAME_SIZE)
    }, [])

    const handleSquareClick = (row: number, col: number) => {
        if (!isRunning) {
            return;
        }

        const nextSquares = [...squares]
        let newPieces = [...pieces]
        if (nextSquares[row][col].text == '') {
            nextSquares[row][col] = {text: 'x', color: nextSquares[row][col].color}
        } else if (nextSquares[row][col].text == 'x') {
            nextSquares[row][col] = {text: '👑', color: nextSquares[row][col].color}
            newPieces.push(row + '#' + col);
        } else {
            nextSquares[row][col] = {text: '', color: nextSquares[row][col].color}
            newPieces = newPieces.filter(val => val != row + '#' + col);
        }

        if (newPieces.length === size) {
            setIsRunning(false);
            if (validateBoard(newPieces, squares)) {
                setResult('You won!');
            } else {
                setResult('You lost!');
            }
        }
        
        setPieces(newPieces);
        setSquares(nextSquares);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsRunning(false);
        setTime(0);
        let newSize = parseInt(e.target.value);
        setSize(newSize);
        initializeBoard(newSize);
    }

    const initializeBoard = (dim: number) => {
        let newSquares = Array.from({ length: dim }, () => 
            Array.from({ length: dim }, () => ({ text: '', color: 0 }))
        )
        setSquares(newSquares);
    }

    const generateBoard = () => {
        setTime(0);
        setIsRunning(true);
        setResult('');
        let newSquares = [...squares];
        let solCols = [...Array(size).keys()];
        let nextColor = 1;
        let randomQueue: [number, number, number][] = [];
        let visited = new Set();

        // choose n starting points for a possible solution
        for (let r = 0; r < size; r++) {
            let c = solCols[Math.floor(Math.random() * solCols.length)];
            
            if (r > 0) {
                randomQueue.push([r - 1, c, nextColor]);
            }

            if (r < size - 1) {
                randomQueue.push([r + 1, c, nextColor]);
            }
            
            if (c > 0) {
                randomQueue.push([r, c - 1, nextColor]);
            }

            if (c < size - 1) {
                randomQueue.push([r, c + 1, nextColor]);
            } 
            
            newSquares[r][c] = {text: '', color: nextColor}
            visited.add(r + '#' + c);
            solCols.splice(solCols.indexOf(c), 1);
            nextColor += 1;
        }

        // flood fill from starting points at random iterations
        while (randomQueue.length > 0) {
            const randomIndex = Math.floor(Math.random() * randomQueue.length);
            const [qr, qc, qcolor] = randomQueue.splice(randomIndex, 1)[0];
            if (!visited.has(qr + '#' + qc)) {
                visited.add(qr + '#' + qc);
                newSquares[qr][qc] = {text: '', color: qcolor}
                if (qr > 0) {
                    randomQueue.push([qr - 1, qc, qcolor]);
                }
    
                if (qr < size - 1) {
                    randomQueue.push([qr + 1, qc, qcolor]);
                }
                
                if (qc > 0) {
                    randomQueue.push([qr, qc - 1, qcolor]);
                }
    
                if (qc < size - 1) {
                    randomQueue.push([qr, qc + 1, qcolor]);
                }
            }
        }

        setSquares(newSquares);
    }

    return (
        <div>
            <h1 className="text-5xl py-10 text-center">Rooks</h1>
            <div className="grid grid-cols-1 lg:mx-10 xl:mx-20 lg:grid-cols-2">
                <div className="flex flex-col items-center">
                    <TimerDisplay time={time}/>
                    <div className="cursor-pointer select-none">
                        {squares.map((row, r) => {
                            return (
                                <div style={{display: 'flex'}} key={r}>
                                    {row.map((col, c) => {
                                        return (
                                            <Square
                                                key={c}
                                                value={col.text}
                                                color={col.color}
                                                error=''
                                                onSquareClick={() => handleSquareClick(r, c)}
                                            />
                                        )
                                    })}
                                </div>
                            )})
                        }
                    </div>
                    
                    
                    <label className="mt-4" htmlFor="board-size">Board Size: {size}</label>
                    <input
                        id="board-size"
                        type="range"
                        min={3}
                        max={8}
                        value={size}
                        onChange={handleInputChange}
                    />
                    
                    <Button
                        className="my-4" 
                        onClick={generateBoard} disabled={isRunning || result.length > 0}
                    >
                        Generate New Board
                    </Button>

                    <h2 className='mt-4'>{result}</h2>
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

export default Queens;