import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { NewsSection } from "./NewsSection";

vi.mock("framer-motion", () => ({
  motion: {
    article: ({ children, ...props }: React.ComponentProps<"article">) => (
      <article {...props}>{children}</article>
    ),
  },
}));

vi.mock("@/components/ui/AnimatedSection", () => ({
  AnimatedSection: ({ children, ...props }: React.ComponentProps<"section">) => (
    <section {...props}>{children}</section>
  ),
}));

describe("NewsSection", () => {
  it("renders the two fixed external articles as horizontal cards", () => {
    render(<NewsSection />);

    expect(screen.getByRole("heading", { name: /fique por dentro/i })).toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(2);
    expect(screen.getByText("Informa Cidade")).toBeInTheDocument();
    expect(screen.getByText("Agenda do Poder")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Edson Albertassi é inocentado pela Justiça" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Quando prender sem prova vira abuso de poder" })).toBeInTheDocument();
  });

  it("opens each original article safely in a new tab", () => {
    render(<NewsSection />);

    const links = screen.getAllByRole("link", { name: /ler matéria/i });
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute(
      "href",
      "https://www.informacidade.com.br/edson-albertassi-e-inocentado-pela-justica/"
    );
    expect(links[1]).toHaveAttribute(
      "href",
      "https://agendadopoder.com.br/quando-prender-sem-prova-vira-abuso-de-poder/"
    );

    for (const link of links) {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });
});
