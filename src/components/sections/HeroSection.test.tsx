import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { HeroSection } from "./HeroSection";

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.ComponentProps<"div">) => (
      <div {...props}>{children}</div>
    ),
    p: ({ children, ...props }: React.ComponentProps<"p">) => (
      <p {...props}>{children}</p>
    ),
  },
}));

vi.mock("next/image", () => ({
  default: ({ alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img alt={alt} {...props} />
  ),
}));

vi.mock("next/link", () => ({
  default: ({ children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a {...props}>{children}</a>
  ),
}));

vi.mock("@/lib/animations", () => ({
  fadeInUp: {},
  fadeInRight: {},
  staggerContainer: {},
}));

describe("HeroSection", () => {
  it("expõe um H1 textual com a marca, cargo e slogan", () => {
    render(<HeroSection />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Edson Albertassi.*Deputado Estadual 15088.*Tem Que Ter Fé/i,
      }),
    ).toBeInTheDocument();
  });
});
