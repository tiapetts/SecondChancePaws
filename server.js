// Second Chance Paws - Backend Server
// Tia Petts | Jan 2026

// Constants and Imports
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
// const e = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

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

    console.log('Incoming adoption request');

    const {
        name,
        email,
        phone_number,
        address,
        city,
        state,
        zip_code,
        animal_id   
    } = req.body;

    res.json({ message: 'Welcome to the Second Chance Paws API!' });
});

// adoption endpoint
app.post('/api/adoptions', (req, res) => {
    const { name, email, phone_number, home_address, city, state, zip_code, animal_id } = req.body;

    if (!name || !email || !phone_number || !home_address || !city || !state || !zip_code || !animal_id) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    db.run(
        sql,
        [name, email, phone_number, home_address, city, state, zip_code, animal_id],
        function(err) {
            if (err) {
                console.error('Error inserting adoption application:', err.message);
                return res.status(500).json({ error: 'Database error.' });
            }

            res.status(201).json({ message: 'Adoption application submitted successfully!', adopter_id: this.lastID, animal_id });
    });

    // check if animal is available for adoption
    db.get(
        'SELECT status FROM animals WHERE id = ?',
        [animal_id],
        (err, animal) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (animal && animal.status !== 'available') {
                return res.status(400).json({ error: 'Animal is not available for adoption.' });
            }

        });

    // insert adopter info

    const insertAdopter = 
        'INSERT INTO adopters (name, email, phone_number, home_address, city, state, zip_code) VALUES (?, ?, ?, ?, ?, ?, ?)';

    db.run(insertAdopter, [name, email, phone_number, home_address || null, city || null, state || null, zip_code || null], function(err) {
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

               res.json({ message: 'Adoption application submitted successfully!', adopter_id: adopterId, adoption_id: this.lastID});
        });
    });
});

console.log('DB PATH:', path.join(__dirname, 'second_chance_paws.db'));

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});