import { act, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { TseSourceNotice } from "./TseSourceNotice";

afterEach(() => vi.useRealTimers());

it("updates the consultation date after midnight without changing the source date", () => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-09-24T02:59:30Z"));
  render(<TseSourceNotice sourceUpdatedAt="2026-09-22T12:30:20-03:00" />);

  expect(screen.getByText(/atualizados em 22\/09\/2026/)).toHaveTextContent("Consulta a esta página em 23/09/2026");

  act(() => vi.advanceTimersByTime(60_000));

  expect(screen.getByText(/atualizados em 22\/09\/2026/)).toHaveTextContent("Consulta a esta página em 24/09/2026");
});
