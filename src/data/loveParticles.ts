export type LoveNameConfig = {
  text: string;
  color: string;
  glow?: string;
};

export type LoveParticleConfig = {
  names: LoveNameConfig[];
  hearts: string[];
  desktopCount: number;
  mobileCount: number;
  heartCountDesktop: number;
  heartCountMobile: number;
  particleCountDesktop: number;
  particleCountMobile: number;
  fallSpeedMin: number;
  fallSpeedMax: number;
  depthMin: number;
  depthMax: number;
  spreadX: number;
  spreadY: number;
  fontFamily: string;
  enabled: boolean;
};

/**
 * Customize falling names, colors, and densities here.
 * Set `enabled: false` to hide the Love Rain section.
 */
export const loveParticleConfig: LoveParticleConfig = {
  names: [
    { text: "ammu❤️", color: "#ff8fb3", glow: "#ec4899" },
    { text: "pattu💙", color: "#7db7ff", glow: "#3b82f6" },
    { text: "buji🖤", color: "#f5f3ff", glow: "#c4b5fd" },
  ],
  hearts: ["❤️", "💕", "💗", "💖", "💘"],
  // Sparse poetic rain over site content (like the mockup)
  desktopCount: 14,
  mobileCount: 7,
  heartCountDesktop: 16,
  heartCountMobile: 8,
  particleCountDesktop: 40,
  particleCountMobile: 16,
  fallSpeedMin: 0.006,
  fallSpeedMax: 0.014,
  depthMin: -8,
  depthMax: 3,
  spreadX: 14,
  spreadY: 16,
  fontFamily: '"Playfair Display", "Georgia", serif',
  enabled: true,
};
