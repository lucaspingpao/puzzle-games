interface KeyProps {
    letter: string,
    onClick: () => void
};

function Key(props: KeyProps) {
    let keyDisplay;
    let regDeviceWidth;
    let smallDeviceWidth;
    switch(props.letter) {
        case '*':
            keyDisplay = '🕳️';
            regDeviceWidth = 'w-12';
            smallDeviceWidth = 'w-8';
            break;
        case '⌫':
            keyDisplay = 'Back ⌫';
            regDeviceWidth = 'w-20';
            smallDeviceWidth = 'w-16';
            break;
        default:
            keyDisplay = props.letter;
            regDeviceWidth = 'w-12';
            smallDeviceWidth = 'w-8';
            break;
    }
    return (
        <div className={`m-0.5 text-center sm:py-3 py-1 border rounded-md cursor-pointer sm:${regDeviceWidth} ${smallDeviceWidth}`} onClick={props.onClick}>
            {keyDisplay}
        </div>
    );
};

export default Key;