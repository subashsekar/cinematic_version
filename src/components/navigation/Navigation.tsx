"use client";

import { useState, useEffect } from "react";
import { Music2, Menu, X, Sun, Moon } from "lucide-react";
import { useAudio } from "@/providers/AudioProvider";

const navLinks = [
  { name: "Home", href: "#hero" },
  { name: "Story", href: "#story" },
  { name: "Memories", href: "#memories" },
  { name: "Gallery", href: "#gallery" },
  { name: "Message", href: "#message" },
];

function MusicGlyph({ playing }: { playing: boolean }) {
  return (
    <span className="relative flex h-5 w-5 items-center justify-center" aria-hidden>
      <Music2 className={`h-5 w-5 ${playing ? "text-romantic-400" : "text-white"}`} />
      {playing && (
        <span className="absolute -right-1.5 bottom-0 flex h-3 items-end gap-[2px]">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-[2px] origin-bottom rounded-full bg-romantic-400 animate-eq-bar"
              style={{
                height: 10,
                animationDelay: `${i * 0.15}s`,
                animationDuration: `${0.7 + i * 0.12}s`,
              }}
            />
          ))}
        </span>
      )}
    </span>
  );
}

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isLight, setIsLight] = useState(false);
  const { isBackgroundPlaying, toggleBackground } = useAudio();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const updateActiveSection = () => {
      for (const link of navLinks) {
        const element = document.getElementById(link.href.substring(1));
        if (!element) continue;
        const rect = element.getBoundingClientRect();
        if (rect.top >= -80 && rect.top <= 280) {
          setActiveSection(link.href.substring(1));
          break;
        }
      }
    };
    window.addEventListener("scroll", updateActiveSection);
    updateActiveSection();
    return () => window.removeEventListener("scroll", updateActiveSection);
  }, []);

  useEffect(() => {
    const toggle = document.getElementById("theme-toggle") as HTMLInputElement | null;
    if (!toggle) return;
    const sync = () => setIsLight(toggle.checked);
    sync();
    toggle.addEventListener("change", sync);
    return () => toggle.removeEventListener("change", sync);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.substring(1));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        isScrolled ? "glass bg-gradient-to-b from-white/5 to-transparent py-3 md:py-4" : "bg-transparent py-4 md:py-6"
      }`}
    >
      <input id="theme-toggle" type="checkbox" className="sr-only" />
      <div className="container mx-auto flex items-center justify-end gap-3 px-4 sm:px-6">
        <div className="hidden items-center gap-5 lg:gap-7 md:flex">
          {navLinks.map((link) => (
            <button
              key={link.name}
              type="button"
              onClick={() => scrollToSection(link.href)}
              className={`relative whitespace-nowrap text-sm font-medium transition-colors hover:text-romantic-400 ${
                activeSection === link.href.substring(1) ? "text-romantic-400" : "text-white/70"
              }`}
            >
              {link.name}
              {activeSection === link.href.substring(1) && (
                <span className="absolute -bottom-2 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-romantic-500 to-violet-500" />
              )}
            </button>
          ))}

          <button
            type="button"
            onClick={() => void toggleBackground()}
            className={`rounded-full p-2 transition-colors ${
              isBackgroundPlaying
                ? "bg-romantic-500/20 ring-1 ring-romantic-400/40 hover:bg-romantic-500/30"
                : "bg-white/5 hover:bg-white/10"
            }`}
            title={isBackgroundPlaying ? "Pause music" : "Play music"}
            aria-label={isBackgroundPlaying ? "Pause music" : "Play music"}
          >
            <MusicGlyph playing={isBackgroundPlaying} />
          </button>
          <label
            htmlFor="theme-toggle"
            className="cursor-pointer rounded-full bg-white/5 p-2 transition-colors hover:bg-white/10"
            title={isLight ? "Dark mode" : "Light mode"}
            aria-label={isLight ? "Dark mode" : "Light mode"}
          >
            {isLight ? <Moon className="h-5 w-5 text-white" /> : <Sun className="h-5 w-5 text-white" />}
          </label>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={() => void toggleBackground()}
            className={`rounded-full p-2 transition-colors ${
              isBackgroundPlaying ? "bg-romantic-500/20 ring-1 ring-romantic-400/40" : "bg-white/5"
            }`}
            aria-label={isBackgroundPlaying ? "Pause music" : "Play music"}
          >
            <MusicGlyph playing={isBackgroundPlaying} />
          </button>
          <button
            type="button"
            className="rounded-full bg-white/5 p-2 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="glass mx-4 mt-3 overflow-hidden rounded-xl sm:mx-6 md:hidden">
          <div className="flex flex-col p-2">
            {navLinks.map((link) => (
              <button
                key={link.name}
                type="button"
                onClick={() => scrollToSection(link.href)}
                className={`rounded-lg px-4 py-3 text-left text-sm transition-colors ${
                  activeSection === link.href.substring(1)
                    ? "bg-romantic-500/20 text-romantic-400"
                    : "text-white/80 hover:bg-white/5"
                }`}
              >
                {link.name}
              </button>
            ))}
            <div className="my-1 h-px bg-white/10" />
            <label htmlFor="theme-toggle" className="flex cursor-pointer items-center gap-3 rounded-lg px-4 py-3 text-sm text-white/80">
              {isLight ? <Moon className="h-5 w-5 text-romantic-400" /> : <Sun className="h-5 w-5 text-romantic-400" />}
              Light / Dark
            </label>
          </div>
        </div>
      )}
    </nav>
  );
}
