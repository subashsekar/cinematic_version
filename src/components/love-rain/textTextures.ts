"use client";

import * as THREE from "three";
import { loveParticleConfig } from "./loveRainConfig";

function makeTextTexture(text: string, color: string, fontSize = 64) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.Texture();

  canvas.width = 512;
  canvas.height = 160;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.font = `600 ${fontSize}px ${loveParticleConfig.fontFamily}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Soft glow
  ctx.shadowColor = color;
  ctx.shadowBlur = 28;
  ctx.fillStyle = color;
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);

  ctx.shadowBlur = 8;
  ctx.fillStyle = "#ffffff";
  ctx.globalAlpha = 0.85;
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  ctx.globalAlpha = 1;

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  texture.anisotropy = 4;
  return texture;
}

const textureCache = new Map<string, THREE.Texture>();

export function getOrCreateTextTexture(text: string, color: string) {
  const key = `${text}::${color}`;
  const cached = textureCache.get(key);
  if (cached) return cached;
  const texture = makeTextTexture(text, color);
  textureCache.set(key, texture);
  return texture;
}

export function disposeTextTextures() {
  textureCache.forEach((texture) => texture.dispose());
  textureCache.clear();
}
