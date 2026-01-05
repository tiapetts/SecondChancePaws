// Second Chance Paws - Backend Server
// Tia Petts | Jan 2026

// Constants and Imports
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;