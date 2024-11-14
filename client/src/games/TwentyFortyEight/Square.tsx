interface SquareProps {
    value: string,
    new: boolean
}

function Square(props: SquareProps) {

    const colorMap = ['white', 'pink', 'orange', 'yellow', 'limegreen', 'lightblue', 'indigo', 'lavender', 'tan'];
    const colorValue = props.value ? Math.round(Math.log(parseInt(props.value)) / Math.log(3)) : 0;

    return (
        <div
            className={
                `flex border border-slate-400 border-4 w-20 h-20 text-3xl items-center justify-center
                ${props.new ?
                    `transition-transform duration-50 scale-95`: 
                    ""
                }`}
            style={{ backgroundColor: colorMap[colorValue] }}
        >
                {props.value}
        </div>
    )
}

export default Square