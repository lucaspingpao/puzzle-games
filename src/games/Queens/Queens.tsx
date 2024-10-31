import { useState, useEffect } from 'react'
import Square from './Square'
import { Button } from 'flowbite-react'
import Leaderboard from '../../components/Leaderboard'

interface SquareAttributes {
    text: string,
    color: number,
}

function Queens() {
    const [size, setSize] = useState<number>(5)
    const [squares, setSquares] = useState<SquareAttributes[][]>([])

    const leaderboardData = [
        { ranking: 1, username: 'Silver', score: '6x6', time: '0:30' },
        { ranking: 2, username: 'Black', score: '6x6', time: '0:35' },
        { ranking: 3, username: 'White', score: '6x6', time: '0:37' },
    ]

    useEffect(() => {
        initializeBoard(5)
    }, [])

    const handleSquareClick = (row: number, col: number) => {
        const nextSquares = [...squares]
        if (nextSquares[row][col].text == '') {
            nextSquares[row][col] = {text: 'x', color: nextSquares[row][col].color}
        } else if (nextSquares[row][col].text == 'x') {
            nextSquares[row][col] = {text: '👑', color: nextSquares[row][col].color}
        } else {
            nextSquares[row][col] = {text: '', color: nextSquares[row][col].color}
        }
        
        setSquares(nextSquares)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newSize = parseInt(e.target.value)
        setSize(newSize)
        initializeBoard(newSize)
    }

    const initializeBoard = (dim: number) => {
        let newSquares = Array.from({ length: dim }, () => 
            Array.from({ length: dim }, () => ({ text: '', color: 0 }))
        )
        setSquares(newSquares)
    }

    const generateBoard = () => {
        let usedColors = Array(size + 1).fill(false)
        usedColors[0] = true
        let newSquares = [...squares]
        
        for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                let canUse = new Set()
                 
                if (r > 0) {
                    canUse.add(newSquares[r - 1][c].color)
                }

                if (r < size - 1) {
                    canUse.add(newSquares[r + 1][c].color)
                }
                
                if (c > 0) {
                    canUse.add(newSquares[r][c - 1].color)
                }

                if (c < size - 1) {
                    canUse.add(newSquares[r][c + 1].color)
                } 

                for (let i = 0; i <= size; i++) {
                    if (!usedColors[i]) {
                        canUse.add(i)
                    }
                }
                canUse.delete(0)

                let canUseArray = Array.from(canUse) as number[];
                const newColor: number = canUseArray[Math.floor(Math.random() * canUseArray.length)];
                newSquares[r][c] = {text: newSquares[r][c].text, color: newColor}
                usedColors[newColor] = true
            }
        }

        setSquares(newSquares)
    }

    return (
        <div>
            <h1 className="text-5xl my-20 text-center">👑 Queens 👑</h1>
            <div className="container m-auto grid grid-cols-2">
                <div className="flex flex-col items-center">
                    <div>
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
                    
                    <div className="flex flex-col my-6">
                        <label htmlFor="board-size">Board Size: {size}</label>
                        <input
                            id="board-size"
                            type="range"
                            min={3}
                            max={8}
                            value={size}
                            onChange={handleInputChange}
                        />
                        <Button className="my-4" onClick={generateBoard}>Generate New Board</Button>
                    </div>
                </div>

                <Leaderboard data={leaderboardData}/>
            </div>
        </div>
    )
}

export default Queens