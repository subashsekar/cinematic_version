import { Intro } from "@/components/intro/Intro";
import { Hero } from "@/components/hero/Hero";
import { Story } from "@/components/story/Story";
import { Memories } from "@/components/memories/Memories";
import { LoveRainSection } from "@/components/love-rain";
import { Gallery } from "@/components/gallery/Gallery";
import { Message } from "@/components/message/Message";
import { Final } from "@/components/final/Final";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <LoveRainSection />
      <Intro />
      <Hero />
      <Story />
      <Memories />
      <Gallery />
      <Message />
      <Final />
    </main>
  );
}
