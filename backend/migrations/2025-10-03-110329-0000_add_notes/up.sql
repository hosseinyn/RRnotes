-- Your SQL goes here
CREATE TABLE rrnotes (
    found_id TEXT PRIMARY KEY UNIQUE NOT NULL,
    note_text TEXT NOT NULL,
    creator_name TEXT NOT NULL,
    creator_password TEXT NOT NULL,
    access_password TEXT NOT NULL
);
