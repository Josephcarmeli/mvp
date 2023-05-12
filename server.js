import express from 'express';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const server = express();
const port = 3000;

const db = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
});

server.use(express.static("public"));
server.use(express.json());

server.get("/api/users", (req, res) => {
    db.query(`SELECT * FROM users`).then((data) => {
        res.json(data.rows);
    }).catch((error) => {
        console.log(error.stack);
        res.status(500).send('Error executing query');
    })
});


server.listen(port, () => {
    console.log(`Server is running on ${port}`);
});

