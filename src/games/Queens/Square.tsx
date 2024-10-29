

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
        <div className="border border-black w-12 h-12 flex text-xl items-center justify-center"
            style={{ backgroundColor: colorMap[props.color] }}
            onClick={props.onSquareClick}
        >
            {props.value}
            {props.error}
        </div>
    )
}

export default Square