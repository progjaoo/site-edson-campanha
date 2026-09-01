import { render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { SectionRouteSync } from "./SectionRouteSync";

const usePathnameMock = vi.fn();

vi.mock("next/navigation", () => ({
  usePathname: () => usePathnameMock(),
}));

describe("SectionRouteSync", () => {
  beforeEach(() => {
    usePathnameMock.mockReset();
    vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => {
      callback(0);
      return 1;
    });
    vi.stubGlobal("cancelAnimationFrame", vi.fn());
  });

  it("rola para a seção correspondente sem criar uma nova página", () => {
    usePathnameMock.mockReturnValue("/noticias");
    const scrollIntoView = vi.fn();
    document.body.innerHTML = '<section id="noticias"></section>';
    const section = document.getElementById("noticias");
    if (section) section.scrollIntoView = scrollIntoView;

    render(<SectionRouteSync />);

    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: "auto", block: "start" });
  });
});
