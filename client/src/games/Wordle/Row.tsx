import Square from './Square'

interface RowProps {
    value: string
    answer: string
    valid: boolean
}

function Row(props: RowProps) {
    let charArray = props.value.split('')
    while (charArray.length < 5) {
        charArray.push(' ')
    }

    let colorMap = Array(5).fill("bg-gray-200")
    if (props.valid && props.value.length === props.answer.length) {
        let charMap = new Map()
        for (let c of props.answer) {
            if (charMap.has(c)) {
                charMap.set(c, charMap.get(c) + 1)
            } else {
                charMap.set(c, 1)
            }
        }

        for (let i = 0; i < charArray.length; i++) {
            if (charArray[i] === props.answer[i]) {
                colorMap[i] = "bg-green-200"
                charMap.set(charArray[i], charMap.get(charArray[i]) - 1)
            }
        }

        for (let j = 0; j < charArray.length; j++) {
            if (charArray[j] === props.answer[j]) {
                ;
            } else if (charMap.has(charArray[j]) && charMap.get(charArray[j]) > 0) {
                colorMap[j] = "bg-yellow-200"
                charMap.set(charArray[j], charMap.get(charArray[j]) - 1)
            } else {
                colorMap[j] = "bg-red-200"
            }
        }
    }

    return (
        <div className="wordle-row flex">
            {charArray.map((c, i) => {
                return (
                    <Square key={i} letter={c} color={colorMap[i]}/>
                )
            })}
        </div>
    )
}

export default Row