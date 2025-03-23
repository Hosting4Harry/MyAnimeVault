export const createTables = () => {
    const sql = `CREATE TABLE Animes (
        id VARCHAR(50) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        status ENUM('watching', 'completed', 'plan_to_watch') NOT NULL,
        episodes INT NOT NULL,
        episodes_watched INT NOT NULL,
        start_date DATE NULL,
        completion_date DATE NULL,
        rating DECIMAL(3,1) NULL
    );`
    const sql2 = `CREATE TABLE Genres (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) UNIQUE NOT NULL
);`

    const sql3 = `CREATE TABLE Anime_Genres (
    anime_id VARCHAR(50),
    genre_id INT,
    PRIMARY KEY (anime_id, genre_id),
    FOREIGN KEY (anime_id) REFERENCES Animes(id) ON DELETE CASCADE,
    FOREIGN KEY (genre_id) REFERENCES Genres(id) ON DELETE CASCADE
);
`
const dropWithForeignKey= `SELECT CONSTRAINT_NAME
FROM information_schema.KEY_COLUMN_USAGE
WHERE TABLE_NAME = 'anime_genres' AND COLUMN_NAME = 'genre_id';


ALTER TABLE anime_genres DROP FOREIGN KEY anime_genres_ibfk_2;


DROP TABLE genres;
`



    return true;
}