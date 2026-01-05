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