import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const data = JSON.parse(fs.readFileSync(path.join(root, "src/data/election-2026.json"), "utf8"));
const outputPath = path.join(root, "infra/cloudflare/seed/2026-candidates.sql");

function sql(value) {
  if (value === null || value === undefined || value === "") return "NULL";
  return `'${String(value).replaceAll("'", "''")}'`;
}

const lines = [
  "PRAGMA foreign_keys = ON;",
  `INSERT INTO election_snapshots (version, source, source_updated_at, status) VALUES (${sql(data.version)}, ${sql(data.source)}, ${sql(data.sourceUpdatedAt)}, 'active') ON CONFLICT(version) DO UPDATE SET source = excluded.source, source_updated_at = excluded.source_updated_at, status = 'active';`,
  "UPDATE election_snapshots SET status = 'archived' WHERE version <> '2026.09.22';",
  "DELETE FROM candidate_photos WHERE snapshot_id = (SELECT id FROM election_snapshots WHERE version = '2026.09.22');",
  "DELETE FROM candidates WHERE snapshot_id = (SELECT id FROM election_snapshots WHERE version = '2026.09.22');",
];

for (const candidate of data.candidates) {
  lines.push(
    `INSERT INTO candidates (candidate_id, snapshot_id, scope, uf, office_code, office_name, ballot_number, ballot_name, party_number, party_acronym, party_name, registration_status, ballot_status, photo_key) VALUES (${sql(candidate.candidateId)}, (SELECT id FROM election_snapshots WHERE version = '2026.09.22'), ${sql(candidate.scope)}, ${sql(candidate.uf)}, ${sql(candidate.officeCode)}, ${sql(candidate.officeName)}, ${sql(candidate.ballotNumber)}, ${sql(candidate.ballotName)}, ${sql(candidate.partyNumber)}, ${sql(candidate.partyAcronym)}, ${sql(candidate.partyName)}, ${sql(candidate.registrationStatus)}, ${sql(candidate.ballotStatus)}, ${sql(candidate.photoKey)});`,
  );
}

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${lines.join("\n")}\n`);
console.log(`Generated ${data.candidates.length} candidate inserts at ${path.relative(root, outputPath)}`);
