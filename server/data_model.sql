CREATE TABLE leaderboard (
    leaderboard_id SERIAL PRIMARY KEY,
    game VARCHAR(255),
    username VARCHAR(255),
    mode VARCHAR(255),
    score INT,
    time_ms INT,
    time_played TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);