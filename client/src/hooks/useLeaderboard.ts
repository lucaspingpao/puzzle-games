import { useState, useEffect } from 'react';

interface LeaderboardEntry {
    username: string,
    mode: string,
    score: number,
    time_ms: number
}

// Define the structure of the hook's return value
interface UseLeaderboardReturn {
    leaderboardData: LeaderboardEntry[];
    fetchData: () => Promise<void>;
    postData: (newEntry: LeaderboardEntry) => Promise<void>;
}

function useLeaderboard (game: string): UseLeaderboardReturn {
    const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);

    const fetchData = async () => {
        try {
            fetch(`${import.meta.env.VITE_API_URL}/get-leaderboard/${game}`)
            .then(response => response.json())
            .then(data => {
                console.log("Successfully fetched data:", data);
                setLeaderboardData(data);
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const postData = async (newEntry: LeaderboardEntry): Promise<void> => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/post-leaderboard/${game}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newEntry),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            console.log('Score submitted successfully:', result);
            fetchData();
        } catch (error) {
            console.error('Error posting data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { leaderboardData, fetchData, postData };
}

export default useLeaderboard;