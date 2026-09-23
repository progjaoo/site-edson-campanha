import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ColinhaBuilder } from "./ColinhaBuilder";
import type { ElectionCandidate } from "@/lib/election/types";

const candidates: ElectionCandidate[] = [
  {
    candidateId: "federal-test-1",
    scope: "RJ",
    uf: "RJ",
    officeCode: "6",
    officeName: "Deputado Federal",
    ballotNumber: "1234",
    ballotName: "Candidata Teste",
    partyNumber: "10",
    partyAcronym: "ABC",
    partyName: "Partido de Teste",
    registrationStatus: "APTO",
    ballotStatus: "APTO",
    photoKey: "candidata-teste.jpg",
    photoPath: "/candidata-teste.jpg",
  },
  {
    candidateId: "190002538813",
    scope: "RJ",
    uf: "RJ",
    officeCode: "7",
    officeName: "Deputado Estadual",
    ballotNumber: "15088",
    ballotName: "Edson Albertassi",
    partyNumber: "15",
    partyAcronym: "MDB",
    partyName: "Movimento Democrático Brasileiro",
    registrationStatus: "APTO",
    ballotStatus: "APTO",
    photoKey: "edson.jpg",
    photoPath: "/edson.jpg",
  },
];

describe("ColinhaBuilder", () => {
  it("selects a candidate, updates the artwork, and stores the optional name locally", async () => {
    render(<ColinhaBuilder candidates={candidates} />);

    fireEvent.click(screen.getAllByRole("button", { name: "Escolher" })[0]);
    const dialog = await screen.findByRole("dialog");
    fireEvent.change(within(dialog).getByLabelText(/buscar candidato/i), {
      target: { value: "Candidata Teste" },
    });

    fireEvent.click(await within(dialog).findByRole("button", { name: /Candidata Teste/ }));

    expect(screen.getAllByText("Candidata Teste").length).toBeGreaterThan(0);
    const poster = document.querySelector(".colinha-poster");
    expect(poster?.textContent).toContain("1234");
    expect(poster?.textContent).toContain("Candidata Teste");

    fireEvent.change(screen.getByLabelText(/nome na colinha/i), {
      target: { value: "João" },
    });
    expect(document.querySelector(".colinha-title-overlay")?.textContent).toBe("COLINHA DO JOÃO");

    await waitFor(() => {
      expect(window.localStorage.getItem("edson:colinha:2026:rj:name:v1")).toBe("João");
    });

    fireEvent.click(screen.getByRole("button", { name: /restaurar exemplo/i }));
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(screen.getAllByText("Edson Albertassi").length).toBeGreaterThan(0);
    await waitFor(() => expect(window.localStorage.getItem("edson:colinha:2026:rj:name:v1")).toBeNull());
  });
});
