// Second Chance Paws - Backend Server
// Tia Petts | Jan 2026

// Constants and Imports
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const e = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// database connection
const db = new sqlite3.Database(
    path.join(__dirname, 'second_chance_paws.db'),
    (err) => {
        if (err) {
            console.error('Error connecting to database:', err.message);
        } else {
            console.log('Connected to the Second Chance Paws database.');
        }  
    } 
);

// test route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Second Chance Paws API!' });
});

// adoption endpoint
app.post('/adopt', (req, res) => {
    const { name, email, phone, animal_id } = req.body;

    if (!name || !email || !phone || !animal_id) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const insertAdopter = 
        'INSERT INTO adopters (name, email, phone, animal_id) VALUES (?, ?, ?, ?)';

    db.run(insertAdopter, [name, email, phone, animal_id], function(err) {
        if (err) {
            console.error('Error inserting adopter:', err.message);
            return res.status(500).json({ error: 'Database error.' });
        }

        const adopterId = this.lastID;

        const insertAdoption =
            'INSERT INTO adoptions (adopter_id, animal_id, adoption_date) VALUES (?, ?, ?)';

        db.run(insertAdoption, [adopterId, animal_id, new Date().toISOString()], function(err) {
            if (err) {
                console.error('Error inserting adoption:', err.message);
                return res.status(500).json({ error: 'Database error.' });
            }   

            //update animal status to adopted
            db.run(
                `UPDATE animals 
                SET status = 'adopted', adopted_at = datetime('now') 
                WHERE id = ?`,
               [animal_id] );

               res.json({ message: 'Adoption successful!', adopterId, adoptionId: this.lastID });
        });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});