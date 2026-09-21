import { withBasePath } from "@/lib/basePath";

export interface StoryData {
  hero: {
    title: string;
    subtitle: string;
    cta: string;
    secondaryText: string;
  };
  story: {
    title: string;
    subtitle: string;
    milestones: StoryMilestone[];
  };
  memories: {
    title: string;
    categories: string[];
    items: MemoryItem[];
  };
  timeline: {
    title: string;
    milestones: TimelineItem[];
  };
  gallery: {
    title: string;
    filters: string[];
    items: GalleryItem[];
  };
  reasons: {
    title: string;
    reasons: ReasonItem[];
  };
  letter: {
    title: string;
    subtitle: string;
    cta: string;
    paragraphs: string[];
  };
  final: {
    title1: string;
    title2: string;
    title3: string;
    cta: string;
  };
}

export interface StoryMilestone {
  title: string;
  date: string;
  description: string;
  image: string;
}

export interface MemoryItem {
  title: string;
  date: string;
  category: string;
  image: string;
  caption: string;
}

export interface TimelineItem {
  title: string;
  date: string;
  description: string;
  image: string;
}

export interface GalleryItem {
  title: string;
  date: string;
  type: "photo" | "video" | "screenshot" | "favorite" | "audio";
  image: string;
  description: string;
  accent?: string;
  src?: string;
}

export interface ReasonItem {
  title: string;
  description: string;
}

export interface ReasonItem {
  title: string;
  description: string;
}

const rawRelationshipData: StoryData = {
  hero: {
    title: "You're my favorite story.",
    subtitle: "A little corner of the internet, made only for you.",
    cta: "Begin Our Story",
    secondaryText: "Scroll to explore ↓",
  },
  story: {
    title: "Our Story",
    subtitle: "Two people. One beautiful journey.",
    milestones: [
      {
        title: "Where It Started",
        date: "The Beginning · February 10, 2022",
        description: "The day I first saw you — a moment that seemed ordinary then, but would quietly become the beginning of my favorite story.",
        image: "/memories/photo-01.jpeg",
      },
      {
        title: "First Conversation",
        date: "The First Time We Talked · February 10, 2022",
        description: "One conversation turned into hours of talking, laughter, and getting to know each other — and somehow, I never wanted that conversation to end.",
        image: "/memories/photo-02.jpeg",
      },
      {
        title: "First Date",
        date: "A Day I'll Always Remember · April 4, 2022",
        description: "Our first date — the day I realized there was something truly special about you, and I wanted to keep discovering it.",
        image: "/memories/photo-03.jpeg",
      },
      {
        title: "First Adventure",
        date: "Our First Journey Together · April 20, 2022",
        description: "Our first trip, our first little adventure together — exploring new places, making memories, and discovering how beautiful life feels when I'm with you.",
        image: "/memories/photo-15.jpeg",
      },
      {
        title: "Today",
        date: "Right Here, Right Now · Today",
        description: "Years may have passed, but one thing hasn't changed — every moment with you is still a moment I want to hold onto forever.",
        image: "/memories/photo-07.jpeg",
      },
    ],
  },
  memories: {
    title: "Our Memories",
    categories: ["All", "Moments", "Trips", "Dates", "Random"],
    items: [
      { title: "Together, Always", date: "A special day", category: "Moments", image: "/memories/memory-01.png", caption: "A little moment that means everything" },
      { title: "Side by Side", date: "A simple day", category: "Random", image: "/memories/memory-02.png", caption: "The best place is next to you" },
      { title: "Blessed Together", date: "A meaningful day", category: "Moments", image: "/memories/memory-03.png", caption: "A memory held close to the heart" },
      { title: "Our Little Family", date: "A beautiful night", category: "Moments", image: "/memories/memory-04.png", caption: "More love in every frame" },
      { title: "Holding On", date: "Always", category: "Dates", image: "/memories/memory-05.png", caption: "Hand in hand, wherever life goes" },
      { title: "Just Us", date: "A sweet day", category: "Dates", image: "/memories/memory-06.png", caption: "A smile, a touch, and a memory" },
      { title: "Evening Ride", date: "A city sunset", category: "Trips", image: "/memories/memory-07.png", caption: "Every journey is better together" },
      { title: "Our Little World", date: "A quiet day", category: "Moments", image: "/memories/photo-01.jpeg", caption: "Where everything felt soft and right" },
      { title: "Close to You", date: "A favorite", category: "Dates", image: "/memories/photo-02.jpeg", caption: "One of our favorite selfies" },
      { title: "Tea for Two", date: "A simple joy", category: "Random", image: "/memories/photo-03.jpeg", caption: "The ordinary magical with you" },
      { title: "A Special Day", date: "Family", category: "Moments", image: "/memories/photo-05.jpeg", caption: "Love in every corner of the frame" },
      { title: "Holding Hands", date: "Always", category: "Dates", image: "/memories/photo-06.jpeg", caption: "Never letting go" },
      { title: "Safe With You", date: "Home", category: "Moments", image: "/memories/photo-07.jpeg", caption: "My favorite place in the world" },
      { title: "At the Fair", date: "An adventure", category: "Trips", image: "/memories/photo-15.jpeg", caption: "Lights, laughter, and you" },
      { title: "Festival Smiles", date: "That night", category: "Trips", image: "/memories/photo-16.jpeg", caption: "Matching smiles under the lights" },
      { title: "Golden You", date: "Celebration", category: "Dates", image: "/memories/photo-19.jpeg", caption: "You looked so beautiful" },
      { title: "Your Smile", date: "Forever", category: "Random", image: "/memories/photo-20.jpeg", caption: "The smile I keep coming back to" },
      { title: "Date Night", date: "Us", category: "Dates", image: "/memories/photo-14.jpeg", caption: "A night worth remembering" },
    ],
  },
  timeline: {
    title: "Our Timeline",
    milestones: [
      {
        title: "First Meeting",
        date: "January 2023",
        description: "The day our paths crossed.",
        image: "/images/timeline1.jpg",
      },
      {
        title: "First Date",
        date: "February 2023",
        description: "A night we'll never forget.",
        image: "/images/timeline2.jpg",
      },
      {
        title: "First Trip",
        date: "March 2023",
        description: "Exploring new places together.",
        image: "/images/timeline3.jpg",
      },
      {
        title: "Favorite Memory",
        date: "June 2023",
        description: "That magical summer evening.",
        image: "/images/timeline4.jpg",
      },
      {
        title: "Today",
        date: "Now",
        description: "Creating beautiful memories every day.",
        image: "/images/timeline5.jpg",
      },
    ],
  },
  gallery: {
    title: "Our Gallery",
    filters: ["Photos", "Videos", "Music"],
    items: [
      {
        title: "Our Little World",
        date: "September 18, 2026",
        type: "favorite",
        image: "/memories/photo-01.jpeg",
        description: "A beautiful day together",
      },
      {
        title: "Close to You",
        date: "September 21, 2026",
        type: "photo",
        image: "/memories/photo-02.jpeg",
        description: "One of our favorite selfies",
      },
      {
        title: "Tea for Two",
        date: "September 21, 2026",
        type: "photo",
        image: "/memories/photo-03.jpeg",
        description: "The simple moments we share",
      },
      {
        title: "My Day",
        date: "August 25, 2026",
        type: "screenshot",
        image: "/memories/photo-04.jpeg",
        description: "A sweet story memory",
      },
      {
        title: "A Special Day",
        date: "September 21, 2026",
        type: "photo",
        image: "/memories/photo-05.jpeg",
        description: "A precious family moment",
      },
      { title: "Holding Hands", date: "September 21, 2026", type: "favorite", image: "/memories/photo-06.jpeg", description: "Always together" },
      { title: "Safe With You", date: "September 21, 2026", type: "favorite", image: "/memories/photo-07.jpeg", description: "My favorite place" },
      { title: "Our Selfie", date: "September 21, 2026", type: "photo", image: "/memories/photo-08.jpeg", description: "Just us" },
      { title: "All Our Moods", date: "September 21, 2026", type: "screenshot", image: "/memories/photo-09.jpeg", description: "Every version of us" },
      { title: "Side by Side", date: "September 21, 2026", type: "photo", image: "/memories/photo-10.jpeg", description: "A day out together" },
      { title: "A Sacred Memory", date: "September 21, 2026", type: "favorite", image: "/memories/photo-11.jpeg", description: "A moment to treasure" },
      { title: "Pink Hearts", date: "September 21, 2026", type: "screenshot", image: "/memories/photo-12.jpeg", description: "A story made with love" },
      { title: "Mirror Moment", date: "September 21, 2026", type: "photo", image: "/memories/photo-13.jpeg", description: "An adventure reflected" },
      { title: "Date Night Selfie", date: "September 21, 2026", type: "photo", image: "/memories/photo-14.jpeg", description: "A night to remember" },
      { title: "At the Fair", date: "September 19, 2026", type: "favorite", image: "/memories/photo-15.jpeg", description: "A magical evening" },
      { title: "Festival Smiles", date: "September 19, 2026", type: "photo", image: "/memories/photo-16.jpeg", description: "Matching smiles" },
      { title: "Evening Ride", date: "September 18, 2026", type: "photo", image: "/memories/photo-17.jpeg", description: "The road feels better with you" },
      { title: "A Beautiful Day", date: "September 18, 2026", type: "photo", image: "/memories/photo-18.jpeg", description: "A lovely family moment" },
      { title: "Golden Celebration", date: "September 18, 2026", type: "photo", image: "/memories/photo-19.jpeg", description: "You looked beautiful" },
      { title: "Your Smile", date: "August 25, 2026", type: "photo", image: "/memories/photo-20.jpeg", description: "A smile I adore" },
      { title: "Graceful You", date: "August 25, 2026", type: "photo", image: "/memories/photo-21.jpeg", description: "Simply beautiful" },
      { title: "Our Fav Music 1 🖤", date: "Favorite track", type: "audio", image: "/memories/memory-01.png", src: "/audio/track-01.mp3", description: "A song that feels like us", accent: "#f8fafc" },
      { title: "Our Fav Music 2 💗", date: "Favorite track", type: "audio", image: "/memories/memory-02.png", src: "/audio/track-02.mp3", description: "A melody for our little moments", accent: "#f9a8d4" },
      { title: "Our Fav Music 3 💜", date: "Favorite track", type: "audio", image: "/memories/memory-03.png", src: "/audio/track-03.mp3", description: "Every beat brings back a memory", accent: "#c4b5fd" },
      { title: "Our Fav Music 4 💙", date: "Favorite track", type: "audio", image: "/memories/memory-04.png", src: "/audio/track-04.mp3", description: "A song for every journey", accent: "#7dd3fc" },
      { title: "Our Fav Music 5 💚", date: "Favorite track", type: "audio", image: "/memories/memory-06.png", src: "/audio/track-05.mp3", description: "Our forever playlist", accent: "#6ee7b7" },
      { title: "Our First Video", date: "September 21, 2026", type: "video", image: "/memories/video-01.mp4", description: "A moving memory" },
      { title: "A Quiet Moment", date: "September 19, 2026", type: "video", image: "/memories/video-02.mp4", description: "A moment worth replaying" },
      { title: "Together", date: "September 21, 2026", type: "video", image: "/memories/video-03.mp4", description: "Us, in motion" },
      { title: "Our Day Out", date: "September 21, 2026", type: "video", image: "/memories/video-04.mp4", description: "A day to remember" },
      { title: "A Gift for You", date: "September 21, 2026", type: "video", image: "/memories/video-05.mp4", description: "Made with love" },
      { title: "Little Joys", date: "September 21, 2026", type: "video", image: "/memories/video-06.mp4", description: "The moments that matter" },
      { title: "Back to August", date: "August 25, 2026", type: "video", image: "/memories/video-07.mp4", description: "A lovely throwback" },
      { title: "Our Night", date: "September 19, 2026", type: "video", image: "/memories/video-08.mp4", description: "Another memory in motion" },
    ],
  },
  reasons: {
    title: "Why I Love You",
    reasons: [
      {
        title: "Your Smile",
        description: "Your smile can turn my worst day into a better one.",
      },
      {
        title: "Your Heart",
        description: "Your kindness and compassion light up the world.",
      },
      {
        title: "Your Strength",
        description: "Your resilience inspires me every single day.",
      },
      {
        title: "Your Presence",
        description: "Simply being with you makes everything better.",
      },
      {
        title: "Your Dreams",
        description: "I love how you chase your dreams with passion.",
      },
      {
        title: "Your Laughter",
        description: "Your laughter is my favorite sound in the world.",
      },
    ],
  },
  letter: {
    title: "A Special Message",
    subtitle: "Just a few words from my heart.",
    cta: "Open My Letter",
    paragraphs: [
      "என் ஆசைப் பட்டு 🖤💙",
      "",
      "உன்னால் காதலிக்கப்பட ஒரே ஆள் நான்.",
      "",
      "04/04/2022 முதல் இன்று வரை,\nஎன் அன்புக்கு உரித்தான ஒரே ஆள் நீதான்.",
      "",
      "இருந்தும், ஒரு சில மனக்கசப்புகள்\nஉன்னிடத்தில் இருக்கின்றன என்றால்,\nஅவற்றைச் சரிசெய்யும்\nஒரு சின்ன முயற்சியே இந்த “Website”.",
      "",
      "உன்னோடு நானும்,\nஎன்னோடு நீயும்,\nநம்மோடு நம் காதலும்\nஎன்றும் வாழும் என்ற நம்பிக்கையில்,",
      "",
      "இந்தக் கடிதம்\nஎன்னால் எழுதப்படுகிறது… ❤️",
      "",
      "என்றும் உன் அன்பில் வாழும்,",
      "உன் ஆசைக் காதலன் (நிலா) ❤️",
    ],
  },
  final: {
    title1: "Thank you for being you.",
    title2: "You are my favorite part of every day.",
    title3: "Forever & Always ♡",
    cta: "Replay Our Story",
  },
};

export const relationshipData: StoryData = {
  ...rawRelationshipData,
  story: {
    ...rawRelationshipData.story,
    milestones: rawRelationshipData.story.milestones.map((item) => ({
      ...item,
      image: withBasePath(item.image),
    })),
  },
  memories: {
    ...rawRelationshipData.memories,
    items: rawRelationshipData.memories.items.map((item) => ({
      ...item,
      image: withBasePath(item.image),
    })),
  },
  timeline: {
    ...rawRelationshipData.timeline,
    milestones: rawRelationshipData.timeline.milestones.map((item) => ({
      ...item,
      image: withBasePath(item.image),
    })),
  },
  gallery: {
    ...rawRelationshipData.gallery,
    items: rawRelationshipData.gallery.items.map((item) => ({
      ...item,
      image: withBasePath(item.image),
      src: item.src ? withBasePath(item.src) : item.src,
    })),
  },
};
