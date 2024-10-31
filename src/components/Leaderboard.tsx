
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";

interface LeaderboardEntry {
    ranking: number;
    username: string;
    score: string;
    time: string;
}

interface LeaderboardProps {
    data: LeaderboardEntry[];
}

function Leaderboard(props: LeaderboardProps) {
    return (
        <div className="overflow-x-auto">
            <Table hoverable>
                <TableHead>
                    <TableHeadCell>Ranking</TableHeadCell>
                    <TableHeadCell>Name</TableHeadCell>
                    <TableHeadCell>Score</TableHeadCell>
                    <TableHeadCell>Time</TableHeadCell>
                </TableHead>
                <TableBody className="divide-y">
                    {props.data.map((val, idx) => {
                        return (
                            <TableRow key={idx} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{val.ranking}</TableCell>
                                <TableCell>{val.username}</TableCell>
                                <TableCell>{val.score}</TableCell>
                                <TableCell>{val.time}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    );
}

export default Leaderboard