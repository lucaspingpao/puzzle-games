import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";

interface LeaderboardData {
    username: string,
    mode: string,
    score: number,
    time_ms: number
}

interface LeaderboardProps {
    data: LeaderboardData[]
}

function Leaderboard(props: LeaderboardProps) {
    return (
        <div className="overflow-x-auto m-10">
            <Table hoverable>
                <TableHead>
                    <TableHeadCell>Ranking</TableHeadCell>
                    <TableHeadCell>Name</TableHeadCell>
                    <TableHeadCell>Mode</TableHeadCell>
                    <TableHeadCell>Score</TableHeadCell>
                    <TableHeadCell>Time</TableHeadCell>
                </TableHead>
                <TableBody className="divide-y">
                    {props.data.map((row, idx) => {
                        const minutes = Math.floor((row.time_ms / 1000) / 60);
                        const seconds = Math.floor((row.time_ms / 1000) % 60);
                        const milliseconds = Math.floor((row.time_ms % 1000));
                        const displayTime = String(minutes) + ':' + String(seconds).padStart(2, '0') + '.' + String(milliseconds).padStart(3, '0');
                        return (
                            <TableRow key={idx} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{idx + 1}</TableCell>
                                <TableCell>{row.username}</TableCell>
                                <TableCell>{row.mode}</TableCell>
                                <TableCell>{row.score}</TableCell>
                                <TableCell>{displayTime}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    );
}

export default Leaderboard;