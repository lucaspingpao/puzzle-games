interface SquareProps {
    letter: string
    color: string
}

function Square(props: SquareProps) {
  return (
    <div className={`${props.color} border border-gray m-0.5 w-16 h-16 flex text-2xl items-center justify-center`}>
        {props.letter}
    </div>
  )
}

export default Square