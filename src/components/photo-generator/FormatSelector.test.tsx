import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { FormatSelector } from "./FormatSelector";

describe("FormatSelector", () => {
  it("offers the three official formats plus the round frame", () => {
    render(<FormatSelector selectedFormat="avatar" onSelectFormat={vi.fn()} />);

    expect(screen.getByRole("button", { name: /avatar \/ perfil/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /postagem \/ feed/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /stories \/ status/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /moldura redonda/i })).toBeInTheDocument();
    expect(screen.getAllByRole("button")).toHaveLength(4);
  });

  it("notifies the selected format", () => {
    const onSelectFormat = vi.fn();
    render(<FormatSelector selectedFormat="avatar" onSelectFormat={onSelectFormat} />);

    screen.getByRole("button", { name: /moldura redonda/i }).click();

    expect(onSelectFormat).toHaveBeenCalledWith("round");
  });
});
