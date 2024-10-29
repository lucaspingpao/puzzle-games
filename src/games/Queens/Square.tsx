

interface SquareProps {
    value: string,
    color: number,
    error: string,
    onSquareClick: () => void,
}

function Square(props: SquareProps) {
    // const [showCrown, setShowCrown] = useState<boolean>(false)

    const colorMap = ['gray', 'pink', 'orange', 'yellow', 'limegreen', 'lightblue', 'lavender'];

    return (
        <div
            style={{ border: '2px solid black', width: 50, height: 50, display: 'flex', fontSize: 24,
                justifyContent: 'center',
                alignItems: 'center', backgroundColor: colorMap[props.color] }}
            onClick={props.onSquareClick}
        >
            {props.value}
            {props.error}
        </div>
    )
}

export default Square