const express = require('express');
const dotenv = require('dotenv');
dotenv.config({path: '.env'});
const PORT = process.env.PORT || '3001';
const app = express();
const pool = require('./database');


/**
 * Middleware
 */

app.use(express.json());
app.use(express.urlencoded({extended:false}));

/**
 * Routes
 */

app.get('/api/user', async function(req, res) {
    try {
        const getUsersQuery = 'SELECT * FROM users';
        const usersQuery = await pool.query(getUsersQuery);
        res.status(200).json(usersQuery);
    } catch (err) {
        res.status(400).send(err.message)
    }
});


/**
 * Start listening 
 */

app.listen(PORT, () => {
    console.log(`Listening for requests on port ${PORT}`)
})