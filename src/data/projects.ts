export interface ProjectDetail {
  label: string;
  content: string[];
}

export interface Project {
  id: string;
  name: string;
  category: string;
  year: string;
  tagline: string;
  description: string;
  highlights: string[];
  tech: string[];
  github: string;
  liveDemo?: string;
  featured: boolean;
  details: ProjectDetail[];
}

export const projects: Project[] = [
  {
    id: "cubecoach",
    name: "CubeCoach",
    category: "Full-Stack · MERN · Algorithms",
    year: "2026",
    tagline: "A full-stack Rubik's Cube platform with a genuine, verified solver — not a simulated one.",
    description:
      "CubeCoach is a full-stack MERN application for solving, learning, and practicing Rubik's Cube techniques. Every solve, algorithm, and statistic is computed from a real cube engine rather than faked — including a genuine two-phase solver, a 3D visualizer, an algorithm library and trainer, and a WCA-style speedcubing timer.",
    highlights: [
      "Implements a two-phase solver (the algorithm family behind Kociemba's method) using iterative-deepening A* with pruning tables — solutions are verified against the cube engine before being shown",
      "A framework-independent shared cube-engine package is the single source of truth for state, moves, validation, scrambles, and solving — reused by the solver, algorithm generation, and 3D visualization",
      "An algorithm library of 102 verified cases (57 OLL, 21 PLL, 24 F2L), independently generated and checked against the engine, with a recognition/recall trainer and per-user progress tracking",
      "Interactive 2D cube input with validation, Three.js / React Three Fiber 3D visualization with move-by-move playback, and a full timer with Ao5/Ao12/Ao50 statistics",
    ],
    tech: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Zustand",
      "TanStack Query",
      "Three.js",
      "React Three Fiber",
      "Node.js",
      "Express",
      "MongoDB",
      "Mongoose",
      "JWT",
      "Zod",
      "Vitest",
      "Playwright",
    ],
    github: "https://github.com/Adityavikram2711/CubeCoach",
    featured: true,
    details: [
      {
        label: "Problem",
        content: [
          "Most cube-solving tools online either fake the solving animation or hide how the algorithm actually works. Speedcubers who want to practice and improve need a place where the solver, the algorithm library, and their own statistics are all real and verifiable — not decorative.",
        ],
      },
      {
        label: "Approach",
        content: [
          "Build a genuine two-phase solver from first principles instead of wrapping an existing library, so the internals are understood and verifiable end to end.",
          "Treat the cube state and move logic as a shared, framework-independent engine so the solver, the 3D visualizer, and the algorithm trainer all operate on one verified source of truth instead of duplicating cube logic.",
        ],
      },
      {
        label: "Architecture",
        content: [
          "A shared TypeScript 'cube-engine' package handles cube state, moves, validation, and scrambling, and is consumed by both the React frontend and the solving logic.",
          "The solver runs in two phases: Phase 1 reduces the search space using all 18 standard moves, Phase 2 completes the solution using a restricted move set — both phases use iterative-deepening A* with pruning tables for speed.",
          "The Express/MongoDB backend handles authentication (JWT + bcrypt), stores personalized algorithm preferences and solve history, and validates all input with Zod.",
        ],
      },
      {
        label: "Key Technical Decisions",
        content: [
          "Independently generating and verifying all 102 OLL/PLL/F2L algorithms against the cube engine rather than hardcoding them from an external source, so correctness is guaranteed by the same engine that powers the solver.",
          "Every generated solution is re-verified against the cube engine before being displayed, so the app never shows a solve that wasn't actually computed.",
          "Using Zustand for lightweight client state and TanStack Query for server state, keeping the frontend state model simple as features were added.",
        ],
      },
      {
        label: "Technologies",
        content: [
          "React, TypeScript, Vite, Tailwind CSS, Zustand, TanStack Query, Three.js, React Three Fiber on the frontend.",
          "Node.js, Express, MongoDB, Mongoose, JWT, bcrypt, Zod on the backend, with Vitest and Playwright for testing.",
        ],
      },
    ],
  },
  {
    id: "nacp",
    name: "NACP",
    category: "Networked Systems · IoT",
    year: "2025",
    tagline: "A Network-Aware Adaptive IoT Communication System that adjusts its own transmission behavior in real time.",
    description:
      "NACP is a closed-loop IoT communication system where an ESP32 device continuously measures network conditions, reports them to a Flask server, and receives adaptive transmission parameters in return — reducing packet size and slowing transmissions automatically when the network degrades.",
    highlights: [
      "ESP32 firmware measures RTT, RSSI, packet loss (sliding 10-transmission window), and application throughput, then reports telemetry to a Flask backend",
      "A server-side decision engine computes a composite network health score (weighted RTT, packet loss, and RSSI) and classifies the link as Good, Moderate, or Poor using hysteresis to avoid flapping between states",
      "The device applies the server's adaptive parameters immediately — from 2s intervals with 512B packets on a good link, down to 10s intervals with 64B packets under congestion",
      "A real-time dashboard (Chart.js) polls live metrics and visualizes the feedback loop, with all readings persisted to SQLite and CSV for offline analysis",
    ],
    tech: ["ESP32", "Arduino/C++", "Python", "Flask", "HTML", "CSS", "JavaScript", "Chart.js", "SQLite"],
    github: "https://github.com/Adityavikram2711/NACP",
    featured: false,
    details: [
      {
        label: "Problem",
        content: [
          "IoT devices typically transmit at a fixed rate regardless of network conditions, wasting bandwidth on good links and causing failed transmissions on poor ones.",
        ],
      },
      {
        label: "Approach",
        content: [
          "Close the loop between the device and the server: the ESP32 measures its own link quality, the server makes the adaptive decision, and the device applies it immediately — rather than hardcoding thresholds on the device itself.",
        ],
      },
      {
        label: "Architecture",
        content: [
          "ESP32 → POSTs JSON telemetry (RTT, RSSI, packet loss, throughput) to a Flask server.",
          "Flask decision engine → scores network health as 0.45×loss + 0.35×rtt + 0.20×rssi, classifies state with hysteresis (3 consecutive agreements required to switch state), and returns { state, interval, packetSize, confidence }.",
          "ESP32 validates and applies the new parameters, while a browser dashboard polls the /metrics endpoint roughly every 2 seconds to visualize the current state and history.",
        ],
      },
      {
        label: "Technologies",
        content: ["ESP32 (Arduino/C++, ArduinoJson) for the device, Python Flask for the server, and Chart.js on the dashboard, with SQLite and CSV for storage."],
      },
    ],
  },
  {
    id: "bda-project",
    name: "Blockchain Real Estate Registry",
    category: "Blockchain · Solidity",
    year: "2025",
    tagline: "A decentralized property registry and marketplace prototype built on Ethereum.",
    description:
      "An early-stage decentralized application for registering, verifying, and transacting real estate properties on the Ethereum blockchain. A Solidity smart contract handles registration, admin verification, ownership transfer, and full ownership history, paired with a Web3.js frontend for interacting with the contract through MetaMask.",
    highlights: [
      "Solidity contract supports property registration, admin-gated verification, and buy transactions that transfer ETH to the previous owner while recording ownership on-chain",
      "Maintains a complete, immutable ownership history per property, queryable through the contract",
      "Frontend built with plain HTML/CSS/JavaScript and Web3.js, designed to connect to a MetaMask wallet and a contract deployed locally via Remix and Ganache",
    ],
    tech: ["Solidity", "Web3.js", "MetaMask", "HTML", "CSS", "JavaScript", "Ganache", "Remix"],
    github: "https://github.com/Adityavikram2711/BDA-Project",
    featured: false,
    details: [
      {
        label: "Problem",
        content: [
          "Traditional property records rely on a central authority and are hard to audit; the project explores using a blockchain ledger to make property registration and ownership transfer transparent and tamper-evident.",
        ],
      },
      {
        label: "Approach",
        content: [
          "Model property registration, verification, and sale as an Ethereum smart contract, with an admin account responsible for verifying new listings before they can be sold.",
        ],
      },
      {
        label: "Architecture",
        content: [
          "RealEstate.sol defines the contract: an admin address, a mapping of property IDs to details (location, price, owner, verification status), and a per-property ownership history array.",
          "registerProperty(), verifyProperty(), and buyProperty() form the core write path; getPropertyDetails(), getAllPropertyIds(), and getOwnershipHistory() expose read access for the frontend.",
          "The HTML/CSS/JS frontend uses Web3.js to connect to MetaMask and render registered properties as a marketplace, intended for local deployment via Remix and Ganache.",
        ],
      },
      {
        label: "Technologies",
        content: ["Solidity for the smart contract, Web3.js and MetaMask for wallet/contract interaction, and a plain HTML/CSS/JavaScript frontend."],
      },
    ],
  },
];

export const featuredProject = projects.find((p) => p.featured)!;
export const secondaryProjects = projects.filter((p) => !p.featured);
