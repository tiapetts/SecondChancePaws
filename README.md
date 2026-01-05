# SecondChancePaws
<h1>Take a look</h1>
<li><a href="https://tiapetts.github.io/SecondChancePaws/public/html">Second Chance Paws Website</a></li>

<br />
A fake adoption website that showcases my development skills
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

