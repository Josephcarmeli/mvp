import express from 'express';
import pg from 'pg';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const server = express();
const port = 3000;

const db = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    },
});

server.use(express.static("public"));
server.use(express.json());
const numSaltRounds = 10;


server.get("/api/users", (req, res) => {
    db.query(`SELECT * FROM users`).then((data) => {
        res.json(data.rows);
    }).catch((error) => {
        console.log(error.stack);
        res.status(500).send('Error executing query');
    })
});

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM users WHERE userid = $1', [id]
    ).then((result) => {
        res.json(result.rows);
    }).catch((error) => {
        console.log(error);
        res.status(500).json ({ error: 'An error occurred'})
    })
})

server.post("/api/register", async (req, res) => {
    const { username, email, password} = req.body;
    const hash = await bcrypt.hash(password, numSaltRounds);

    db.query(`
    INSERT INTO users (Username, Email, Password, RegistrationDate)
    VALUES($1, $2, $3, $4) RETURNING *`,
    [username, email, hash, new Date()]
    ).then(result => {
        const userID = result.rows[0].userid;
        res.status(200).json({ userID, message: "Registration successful"});
    })
    .catch(error => {
        console.error(error);
        res.status(500).json({ error: error.message});
    })
});

server.post("/api/login", async (req, res) => {
    const { username, password } = req.body;

    db.query(`
    SELECT * FROM users WHERE username = $1`,
    [username]
    ).then(async (result) => {
        if (result.rows.length > 0) {
            const user = result.rows[0];

            const isValid = await bcrypt.compare(password, user.password);

            if (isValid) {
                const userID = user.userid;
                res.status(200).json({ message: "Login successful", userID});
            } else {
                res.status(401).json({ error: "Invalid username or password"});
            }
            } else {
                res.status(401).json({ error: "Invalid username or password"});
            }
    }).catch((error) => {
        console.log(error);
        res.status(500).json({ error: error.message});
    })
})

server.delete('/api/delete/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM users WHERE userid = $1', [id]
    ).then(() => {
        res.status(200).json({ message: 'User deleted'});
    }).catch((error) => {
        console.log(error);
        res.status(500).json({ error: error.message});
    })

})

server.post('/api/posts', (req, res) => {
    const { UserID, Title, Content } = req.body;

    if (!UserID) {
        res.status(400).json({ error: 'Missing UserID' });
        return;
    }

    db.query(`SELECT * FROM users WHERE userid = $1`, [UserID])
        .then((result) => {
            if (result.rows.length === 0) {
                res.status(400).json({ error: 'Invalid UserID' });
            } else {
                const postDate = new Date();
                db.query(
                    `INSERT INTO posts (UserID, Title, Content, PostDate)
                    VALUES ($1, $2, $3, $4)
                    RETURNING *`,
                    [UserID, Title, Content, postDate]
                )
                    .then((insertResult) => {
                        const insertedPost = insertResult.rows[0];
                        res.status(200).json({
                            message: 'Post created',
                            post: insertedPost,
                        });
                    })
                    .catch((error) => {
                        console.error(error);
                        res.status(500).json({ error: error.message });
                    });
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: error.message });
        });
});


server.listen(port, () => {
    console.log(`Server is running on ${port}`);
});

