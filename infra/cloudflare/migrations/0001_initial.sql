PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS election_snapshots (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  version TEXT NOT NULL UNIQUE,
  source TEXT NOT NULL,
  source_updated_at TEXT NOT NULL,
  imported_at TEXT NOT NULL DEFAULT (datetime('now')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'archived'))
);

CREATE TABLE IF NOT EXISTS candidates (
  candidate_id TEXT NOT NULL,
  snapshot_id INTEGER NOT NULL REFERENCES election_snapshots(id) ON DELETE CASCADE,
  scope TEXT NOT NULL CHECK (scope IN ('RJ', 'BR')),
  uf TEXT NOT NULL,
  office_code TEXT NOT NULL,
  office_name TEXT NOT NULL,
  ballot_number TEXT NOT NULL,
  ballot_name TEXT NOT NULL,
  party_number TEXT,
  party_acronym TEXT,
  party_name TEXT,
  registration_status TEXT,
  ballot_status TEXT,
  photo_key TEXT NOT NULL,
  PRIMARY KEY (candidate_id, snapshot_id)
);

CREATE INDEX IF NOT EXISTS idx_candidates_scope_office
  ON candidates(snapshot_id, scope, office_code);
CREATE INDEX IF NOT EXISTS idx_candidates_name
  ON candidates(snapshot_id, ballot_name COLLATE NOCASE);
CREATE INDEX IF NOT EXISTS idx_candidates_number
  ON candidates(snapshot_id, office_code, ballot_number);

CREATE TABLE IF NOT EXISTS candidate_photos (
  candidate_id TEXT NOT NULL,
  snapshot_id INTEGER NOT NULL REFERENCES election_snapshots(id) ON DELETE CASCADE,
  object_key TEXT NOT NULL,
  content_type TEXT NOT NULL DEFAULT 'image/jpeg',
  byte_size INTEGER,
  PRIMARY KEY (candidate_id, snapshot_id),
  UNIQUE (snapshot_id, object_key)
);

CREATE VIEW IF NOT EXISTS active_candidates AS
SELECT c.*
FROM candidates c
JOIN election_snapshots s ON s.id = c.snapshot_id
WHERE s.status = 'active';
