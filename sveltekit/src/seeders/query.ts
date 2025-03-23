export const createTables = () => {
    const sql = `CREATE TABLE Animes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    status VARCHAR(255) NOT NULL,
    episodes INT NOT NULL,
    episodesWatched INT NOT NULL,
    startDate DATE NULL,
    completionDate DATE NULL,
    rating DECIMAL(3,1) NULL,
    genreIds VARCHAR(500) NOT NULL
);`
    const sql2 = `CREATE TABLE Genres (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(50) UNIQUE NOT NULL
);`
const genre=`INSERT INTO genres (title) VALUES
    ('Action'),
    ('Adventure'),
    ('Comedy'),
    ('Drama'),
    ('Fantasy'),
    ('Psychological'),
    ('Slice of Life'),
    ('Supernatural'),
    ('Thriller');`


const dropWithForeignKey= `SELECT CONSTRAINT_NAME
FROM information_schema.KEY_COLUMN_USAGE
WHERE TABLE_NAME = 'anime_genres' AND COLUMN_NAME = 'genre_id';


ALTER TABLE anime_genres DROP FOREIGN KEY anime_genres_ibfk_2;


DROP TABLE genres;
`



    return true;
}