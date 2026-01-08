# SecondChancePaws
<h1>Take a look</h1>
<br />
Second Chance Paws is a full-stack web application designed to manage animal adoptions for a fictional rescue organization. The system allows prospective adopters to submit adoption applications while enforcing backend business rules that ensure data integrity, prevent duplicate adoptions, and maintain consistent application state across sessions.

The project emphasizes real-world backend validation, API-driven frontend behavior, and portable database design, making it suitable as a technical demonstration for employers.

<h2>My Moodboard Inspiration</h2>
<img width="1841" height="264" alt="image" src="https://github.com/user-attachments/assets/d6f461cf-3ae3-469e-bb8f-acb19881a5fc" />

<br />

<h2>Second Chance Paws ERD</h2>
<img width="1061" height="529" alt="image" src="https://github.com/user-attachments/assets/3c2fc45b-3027-40f1-b8b8-891e6c429645" />

## Database Design

Second Chance Paws uses a normalized SQLite database designed to support
real-world shelter operations including animal listings, adoptions,
stories, and media.

### Key Design Goals
- Data normalization (3NF)
- Clear ownership of responsibility per table
- Scalability for future backend/API integration
<img width="384" height="805" alt="image" src="https://github.com/user-attachments/assets/6adcc4e6-f645-4a4d-8691-6766a77dfd75" />
<br />
**Normalized relational schema showing animals, species, adopters, adoptions, images, and stories.

<br />

### Features

<ul>
  <li>RESTful API endpoints for animals and adoptions</li>

  <li>SQLite database bundled with the project for portability</li>

  <li>Dynamic population of adoptable animals via /api/animals</li>

  <li>Server-side validation preventing adoption of unavailable animals</li>

  <li>Client-side form validation with graceful error handling</li>

  <li>Defensive programming to support multi-page script reuse</li>
</ul>

### Architecture Overview

#### Front End 
<ul>
  <li>Vanilla HTML, CSS, and JavaScript</li>

  <li>Adoption form dynamically populated via API</li>

  <li>Client-side validation prior to submission</li>

  <li>Graceful handling of server response</li>
</ul>

#### Backend
<ul>
  <li>Node.js with Express</li>

  <li>SQLite database for persistence</li>
</ul>

#### API endpoints:
<ul>

  <li>GET /api/animals — returns all animals</li>

  <li>POST /api/adoptions — submits an adoption application</li>

  <li>Enforced business logic preventing duplicate adoptions</li>
</ul>

  ### Core Tables
- **animals**: Central entity representing adoptable animals
- **species**: Lookup table to normalize animal types (Dog, Cat, etc.)
- **adopters**: Stores adopter contact information
- **adoptions**: Junction table linking adopters to animals
- **images**: Supports multiple images per animal
- **stories**: Adoption and success stories linked to animals
_____________________________________________________________________

 🚧 This project is under active development.  
 The database is complete and normalized; frontend and backend
 integration is ongoing.
_____________________________________________________________________
## Seed Data

--included in the project structure under ./db
______________________________________________________________________

## Running the Project Locally

1. Install dependencies:
   npm install

2. Start the server:
   node server.js

3. Open in browser:
   http://localhost:3000

   <br />

   **This project uses SQLite for simplicity and ease of setup in a local development environment.
   <br />
   ***If the backend is not running, form submission will return a server error.

