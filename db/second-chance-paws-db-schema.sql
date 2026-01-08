BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS adopters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    home_address TEXT,
    city TEXT,
    state TEXT,
    zip_code TEXT
, phone_number TEXT);
CREATE TABLE IF NOT EXISTS adoptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    animal_id INTEGER NOT NULL,
    adopter_id INTEGER NOT NULL,
    adoption_date TEXT NOT NULL DEFAULT (datetime('now')),

    FOREIGN KEY (animal_id) REFERENCES animals(id),
    FOREIGN KEY (adopter_id) REFERENCES adopters(id)
);
CREATE TABLE IF NOT EXISTS "animals" (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    species_id INTEGER NOT NULL,
    age INTEGER,
    description TEXT,
    status TEXT NOT NULL CHECK (status IN ('available', 'adopted', 'pending')),
    created_at TEXT DEFAULT (datetime('now')),
    adopted_at TEXT,

    FOREIGN KEY (species_id) REFERENCES species(id)
);
CREATE TABLE IF NOT EXISTS images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    animal_id INTEGER NOT NULL,
    image_url TEXT NOT NULL,
    alt_text TEXT,

    FOREIGN KEY (animal_id) REFERENCES animals(id)
);
CREATE TABLE IF NOT EXISTS species (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,      -- Dog, Cat, Rabbit, etc
    description TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS stories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    animal_id INTEGER,
    published_at TEXT DEFAULT (datetime('now')),

    FOREIGN KEY (animal_id) REFERENCES animals(id)
);
CREATE INDEX IF NOT EXISTS idx_adoptions_adopter ON adoptions(adopter_id);
CREATE INDEX IF NOT EXISTS idx_adoptions_animal ON adoptions(animal_id);
CREATE INDEX IF NOT EXISTS idx_images_animal ON images(animal_id);
CREATE INDEX IF NOT EXISTS idx_stories_animal ON stories(animal_id);
COMMIT;
