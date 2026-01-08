// Second Chance Paws - Backend Server
// Tia Petts | Jan 2026

// Constants and Imports
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, 'second_chance_paws.db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// database connection
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Connected to the Second Chance Paws database.');
        console.log('DB PATH:', dbPath);
    }
    // (err) => {
    //     if (err) {
    //         console.error('Error connecting to database:', err.message);
    //     } else {
    //         console.log('Connected to the Second Chance Paws database.');
    //     }  
    // } 
});

// Debugging: Log actual DB file path
const fs = require('fs');

db.serialize(() => {
  const schema = fs.readFileSync(
    path.join(__dirname, 'db', 'second-chance-paws-db-schema.sql'),
    'utf8'
  );
  console.log('DB SCHEMA:\n', schema);

  db.exec(schema, (err) => {
    if (err) {
      console.error('Error executing schema:', err.message);
    } else {
      console.log('Database schema executed successfully.');
    }
  });
}); 

// console.log('ACTUAL DB FILE:', path.resolve(__dirname, 'C:/Users/curts/OneDrive/Desktop/DB/Second_Chance_Paws/second_chance_paws.db'));

// homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// test route
app.get('/api', (req, res) => {

    res.json({ message: 'Welcome to the Second Chance Paws API!' });
});

// get all available animals for dropdowns
app.get('/api/animals', (req, res) => {

    const sql = `SELECT 
      animals.id, 
      animals.name, 
      species.name AS species, 
      animals.age,
      FROM animals
      JOIN species ON animals.species_id = species.id
      WHERE animals.status = 'available'
      ORDER BY animals.name ASC`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error('Error fetching animals:', err.message);
            return res.status(500).json({ error: 'Database error.' });
        }

        res.json(rows);
    });

});

// adoption endpoint
app.post('/api/adoptions', (req, res) => {

    console.log('REQ BODY:', req.body);

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
          return res.status(500).json({ error: 'Database error selecting animal.' });
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
              return res.status(500).json({ error: 'Database error inserting Adopter.' });
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
                  return res.status(500).json({ error: 'Database error inserting Adoption.' });
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
                      return res.status(500).json({ error: 'Database error updating animal status.' });
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
  
    


// console.log('DB PATH:', path.join(__dirname, 'second_chance_paws.db'));

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});