import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import HomePage from "./page";

vi.mock("@/components/sections/HeroSection", () => ({
  HeroSection: () => <section data-section="hero" />,
}));
vi.mock("@/components/sections/WhatsAppSection", () => ({
  WhatsAppSection: () => <section data-section="whatsapp" />,
}));
vi.mock("@/components/sections/SocialSection", () => ({
  SocialSection: () => <section data-section="social" />,
}));
vi.mock("@/components/sections/GallerySection", () => ({
  GallerySection: () => <section data-section="gallery" />,
}));
vi.mock("@/components/sections/NewsSection", () => ({
  NewsSection: () => <section data-section="news" />,
}));

describe("HomePage", () => {
  it("renders the approved section order with news last", () => {
    const { container } = render(<HomePage />);
    const order = Array.from(container.querySelectorAll("main > [data-section]")).map(
      (section) => section.getAttribute("data-section"),
    );

    expect(order).toEqual([
      "hero",
      "whatsapp",
      "social",
      "gallery",
      "news",
    ]);
  });
});
