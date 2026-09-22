export type ElectionScope = "RJ" | "BR";

export type ElectionCandidate = {
  candidateId: string;
  scope: ElectionScope;
  uf: string;
  officeCode: string;
  officeName: string;
  ballotNumber: string;
  ballotName: string;
  partyNumber: string | null;
  partyAcronym: string | null;
  partyName: string | null;
  registrationStatus: string | null;
  ballotStatus: string | null;
  photoKey: string;
  photoPath: string;
};

export type ElectionSnapshot = {
  version: string;
  source: string;
  sourceUpdatedAt: string;
  scope: Record<ElectionScope, string>;
  candidates: ElectionCandidate[];
};

export type BallotSlotId =
  | "deputadoFederal"
  | "deputadoEstadual"
  | "senador1"
  | "senador2"
  | "governador"
  | "presidente";

export type BallotSelection =
  | { kind: "candidate"; candidateId: string }
  | { kind: "blank" }
  | { kind: "null" }
  | { kind: "legend" };

export type BallotSelections = Partial<Record<BallotSlotId, BallotSelection>>;

export const BALLOT_SLOTS: Array<{
  id: BallotSlotId;
  label: string;
  officeCode: string;
  scope: ElectionScope;
  required: boolean;
}> = [
  { id: "presidente", label: "Presidente", officeCode: "1", scope: "BR", required: true },
  { id: "governador", label: "Governador", officeCode: "3", scope: "RJ", required: true },
  { id: "senador1", label: "Senador 1", officeCode: "5", scope: "RJ", required: true },
  { id: "senador2", label: "Senador 2", officeCode: "5", scope: "RJ", required: false },
  { id: "deputadoFederal", label: "Deputado Federal", officeCode: "6", scope: "RJ", required: true },
  { id: "deputadoEstadual", label: "Deputado Estadual", officeCode: "7", scope: "RJ", required: true },
];
