// Second Chance Paws - Backend Server
// Tia Petts | Jan 2026

// Constants and Imports
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// database connection
const db = new sqlite3.Database(
    path.join(__dirname, 'second_chance_paws.sqbpro'),
    (err) => {
        if (err) {
            console.error('Error connecting to database:', err.message);
        } else {
            console.log('Connected to the Second Chance Paws database.');
        }  
    } 
);

console.log('ACTUAL DB FILE:', path.resolve(__dirname, 'second_chance_paws.sqbpro'));


// test route
app.get('/', (req, res) => {

    res.json({ message: 'Welcome to the Second Chance Paws API!' });
});

// adoption endpoint
app.post('/api/adoptions', (req, res) => {
    const {
      name,
      email,
      phone,
      address,
      city,
      state,
      zip,
      animal_id
    } = req.body;
  
    if (!name || !email || !phone || !address || !city || !state || !zip || !animal_id) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
  
    // Check animal availability
    db.get(
      'SELECT status FROM animals WHERE id = ?',
      [animal_id],
      (err, animal) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Database error.' });
        }
  
        if (!animal || animal.status !== 'available') {
          return res.status(400).json({ error: 'Animal is not available for adoption.' });
        }
  
        // Insert adopter
        const insertAdopter = `
          INSERT INTO adopters
          (name, email, phone_number, home_address, city, state, zip_code)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
  
        db.run(
          insertAdopter,
          [name, email, phone, address, city, state, zip],
          function (err) {
            if (err) {
              console.error(err);
              return res.status(500).json({ error: 'Database error.' });
            }
  
            const adopterId = this.lastID;
  
            // Insert adoption
            const insertAdoption = `
              INSERT INTO adoptions
              (adopter_id, animal_id, adoption_date)
              VALUES (?, ?, datetime('now'))
            `;
  
            db.run(
              insertAdoption,
              [adopterId, animal_id],
              function (err) {
                if (err) {
                  console.error(err);
                  return res.status(500).json({ error: 'Database error.' });
                }
  
                // Update animal status
                db.run(
                  `UPDATE animals
                   SET status = 'adopted', adopted_at = datetime('now')
                   WHERE id = ?`,
                  [animal_id],
                  (err) => {
                    if (err) {
                      console.error(err);
                      return res.status(500).json({ error: 'Database error.' });
                    }
  
                    // Final response (ONE TIME)
                    res.status(201).json({
                      message: 'Adoption application submitted successfully!',
                      adopter_id: adopterId,
                      adoption_id: this.lastID
                    });
                  }
                );
              }
            );
          }
        );
      }
    );
  });
  
    


console.log('DB PATH:', path.join(__dirname, 'second_chance_paws.db'));

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});