import fs from "node:fs";
import path from "node:path";
import { TextDecoder } from "node:util";

const root = process.cwd();
const inputRoot = path.join(root, "csv_fotos_candidatos");
const outputPath = path.join(root, "src/data/election-2026.json");

const decoder = new TextDecoder("windows-1252");

function parseCsvLine(line) {
  const fields = [];
  let value = "";
  let quoted = false;

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    const next = line[index + 1];

    if (character === '"' && quoted && next === '"') {
      value += '"';
      index += 1;
    } else if (character === '"') {
      quoted = !quoted;
    } else if (character === ";" && !quoted) {
      fields.push(value);
      value = "";
    } else {
      value += character;
    }
  }

  fields.push(value);
  return fields;
}

function readCsv(filePath) {
  const source = decoder.decode(fs.readFileSync(filePath)).replace(/^\uFEFF/, "");
  const lines = source.split(/\r?\n/).filter((line) => line.length > 0);
  const headers = parseCsvLine(lines[0]);

  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    return Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""]));
  });
}

function clean(value) {
  return value && value !== "#NE" && value !== "#NULO" ? value : null;
}

function mapCandidate(row, scope, photoPrefix) {
  const candidateId = row.SQ_CANDIDATO;
  return {
    candidateId,
    scope,
    uf: row.SG_UF || (scope === "BR" ? "BR" : "RJ"),
    officeCode: row.CD_CARGO,
    officeName: row.DS_CARGO,
    ballotNumber: row.NR_CANDIDATO,
    ballotName: row.NM_URNA_CANDIDATO,
    partyNumber: clean(row.NR_PARTIDO),
    partyAcronym: clean(row.SG_PARTIDO),
    partyName: clean(row.NM_PARTIDO),
    registrationStatus: clean(row.DS_SITUACAO_CANDIDATURA),
    ballotStatus: clean(row.DS_SIT_TOT_TURNO),
    photoKey: `candidates/2026/${scope.toLowerCase()}/${candidateId}.jpg`,
    photoPath: `/candidate-photos/2026/${scope.toLowerCase()}/${photoPrefix}${candidateId}_div.jpg`,
  };
}

const rjRows = readCsv(
  path.join(inputRoot, "rio_de_janeiro", "consulta_cand_2026_RJ.csv"),
).filter((row) => ["3", "5", "6", "7"].includes(row.CD_CARGO));

const brRows = readCsv(
  path.join(inputRoot, "brasil_presidente", "consulta_cand_2026_BRASIL.csv"),
).filter((row) => row.CD_CARGO === "1");

const candidates = [
  ...rjRows.map((row) => mapCandidate(row, "RJ", "FRJ")),
  ...brRows.map((row) => mapCandidate(row, "BR", "FBR")),
].sort((left, right) => {
  const office = left.officeCode.localeCompare(right.officeCode);
  if (office !== 0) return office;
  return left.ballotName.localeCompare(right.ballotName, "pt-BR");
});

const output = {
  version: "2026.09.22",
  source: "TSE DivulgaCandContas 2026",
  sourceUpdatedAt: "2026-09-22T12:30:20-03:00",
  scope: {
    RJ: "Cargos estaduais do Rio de Janeiro",
    BR: "Presidência da República",
  },
  candidates,
};

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
console.log(`Generated ${candidates.length} candidates at ${path.relative(root, outputPath)}`);
