import * as THREE from "three";

type AreaPolygon = {
  id: string;
  polygon: [number, number][];
  color: string;
};

export function createColorTexture(color: string) {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const context = canvas.getContext("2d")!;
  context.fillStyle = color;
  context.beginPath();
  context.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI);
  context.fill();
  return new THREE.CanvasTexture(canvas);
}

export function getRandomColor() {
  const colors = ["red", "blue", "green", "orange", "yellow", "purple"];
  return colors[Math.floor(Math.random() * colors.length)];
}

export const globeMaterial = () =>
  new THREE.MeshPhongMaterial({
    color: 0xffffff,
    shininess: 5,
    specular: 0x222222,
  });

export const militarySentences = [
  "The soldiers advanced under heavy fire, maintaining formation and executing their mission with precision, courage, and unwavering discipline despite the chaos erupting around them on the front lines.",
  "Tactical air support was called in to neutralize enemy bunkers, allowing ground forces to breach fortified zones and reclaim strategic positions without unnecessary loss of personnel.",
  "In the dead of night, special forces deployed behind enemy lines, gathering intelligence and disabling communication systems to ensure a successful offensive at dawn.",
  "Commanders monitored the battlefield in real time, coordinating artillery strikes and maneuver units to flank the enemy and disrupt their supply lines with surgical precision.",
  "Training exercises simulated real combat scenarios, preparing troops for high-pressure environments where quick decisions and teamwork can mean the difference between victory and defeat.",
  "The unit held their position despite being outnumbered, using cover, suppressive fire, and coordinated defense to repel waves of advancing enemies.",
  "Stealth drones hovered silently above, relaying live imagery and coordinates to forward units engaged in high-risk reconnaissance missions deep within hostile territory.",
  "The operation demanded absolute silence, as every footstep and breath was calculated, moving through shadows to eliminate high-value targets without detection.",
  "With night-vision gear and satellite mapping, the team navigated hostile terrain, avoiding booby traps and coordinating with allied forces to stage a surprise assault.",
  "Each soldier relied on instinct, training, and trust in their team as they fought through dense jungle under constant threat of ambush and sniper fire.",
];

export const areaSelected: AreaPolygon[] = [
  {
    id: "conflict1",
    polygon: [
      [5, 5],
      [30, 10],
      [25, 25],
      [10, 20],
    ],
    color: "rgba(255, 0, 0, 0.6)",
  },
  {
    id: "flight1",
    polygon: [
      [10, -40],
      [35, -30],
      [40, -10],
      [20, -15],
    ],
    color: "rgba(0, 0, 255, 0.4)",
  },
  {
    id: "conflict2",
    polygon: [
      [-30, 20],
      [-20, 30],
      [-10, 40],
      [-30, 40],
    ],
    color: "rgba(255, 0, 0, 0.5)",
  },
  {
    id: "flight2",
    polygon: [
      [-45, -70],
      [-30, -60],
      [-25, -50],
      [-40, -40],
    ],
    color: "rgba(0, 0, 255, 0.4)",
  },
  {
    id: "conflict3",
    polygon: [
      [45, 60],
      [60, 65],
      [65, 80],
      [50, 75],
    ],
    color: "rgba(255, 0, 0, 0.5)",
  },
  {
    id: "flight3",
    polygon: [
      [35, -100],
      [50, -90],
      [55, -80],
      [40, -85],
    ],
    color: "rgba(0, 0, 255, 0.4)",
  },
  {
    id: "conflict4",
    polygon: [
      [0, 100],
      [20, 110],
      [20, 120],
      [0, 110],
    ],
    color: "rgba(255, 0, 0, 0.4)",
  },
  {
    id: "flight4",
    polygon: [
      [-60, 80],
      [-45, 90],
      [-40, 100],
      [-50, 95],
    ],
    color: "rgba(0, 0, 255, 0.3)",
  },
  {
    id: "conflict5",
    polygon: [
      [-20, -20],
      [-10, -10],
      [0, -10],
      [-15, -5],
    ],
    color: "rgba(255, 0, 0, 0.6)",
  },
  {
    id: "flight5",
    polygon: [
      [-10, 140],
      [5, 145],
      [10, 160],
      [-5, 155],
    ],
    color: "rgba(0, 0, 255, 0.4)",
  },
];


export const markerIcons = [
  "/icons/marker1.png",
  "/icons/marker2.png",
  "/icons/marker3.png",
];

export const getRandomMilitarySentence = () => {
  const index = Math.floor(Math.random() * militarySentences.length);
  return militarySentences[index];
};