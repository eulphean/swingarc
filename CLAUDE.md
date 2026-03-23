# SwingArc — Baseball Timing Game

## Project Overview
A React Native mobile game built with Expo + expo-gl + React Three Fiber (R3F).
The player taps to swing a bat and tries to hit a baseball pitched toward them.
Three strikes = game over.

## Tech Stack
- React Native + Expo (managed workflow)
- expo-gl (WebGL bridge for React Native)
- React Three Fiber (@react-three/fiber) — R3F for React Native
- @react-three/drei — helpers (Trail, useGLTF, etc.)
- @react-spring/three — spring animations
- TypeScript

## Project Structure
```
/app
  index.tsx          ← start screen
  game.tsx           ← main game screen
/components
  GameCanvas.tsx     ← R3F Canvas wrapper (expo-gl)
  Bat.tsx            ← bat mesh + swing animation
  Ball.tsx           ← ball mesh + pitch animation
  SwingTrail.tsx     ← Drei Trail on bat tip
  HUD.tsx            ← React Native UI overlay (score, strikes, tap prompt)
/hooks
  useGameLoop.ts     ← game state machine
/assets
  bat.glb            ← baseball bat GLTF model (add later)
```

## Design System
- Design philosophy and specifications: DESIGN.md ("The Kinetic Vault" aesthetic)
- Implementation (colors, spacing, typography): constants/designTokens.ts
- Always reference DESIGN.md for principles and designTokens.ts for values when creating/updating UI

## Game Loop
1. Ball spawns far away (z = -50) and travels toward camera over ~1.5s
2. Player taps anywhere → bat swings (rotation animation)
3. HIT: ball z-position is within threshold when swing fires → ball launches away, score++
4. MISS: strike++. Three strikes → game over screen
5. Each hit increases pitch speed slightly

## Camera & Scene
- Over-the-shoulder batter POV
- Ball travels straight down the center toward camera
- Bat sits lower-right, angled at rest (barrel upper-left, grip lower-right)
- Dark stadium atmosphere, ambient + directional lighting
- No shadows (mobile performance)

## Bat Details
- Day 1: use procedural geometry (CylinderGeometry for barrel, smaller cylinder for handle)
- Day 2: swap in bat.glb GLTF model
- Pivot point should be at the handle/knob end, not center
- Swing rotates from rest position (~-45deg) to contact position (~30deg) on Z axis

## Visual Effects
- Drei <Trail> component follows bat tip during swing
- Trail: white → blue color, width 0.3, length 8, decay 1
- On HIT: ball launches with impulse animation + camera shake (subtle)
- On MISS: brief red flash overlay

## HUD (React Native layer, above Canvas)
- Top center: 3 strike dots (○ ○ ○, filled on strike)
- Top right: score number
- Bottom center: "TAP TO SWING" — pulsing, only visible when ball is incoming
- Keep it minimal — the 3D scene should breathe

## Performance Rules
- No shadow maps
- Use useRef for animation values, not useState
- Dispose geometries on unmount
- Keep draw calls minimal

## Working Style for Claude Code
- Work ONE step at a time
- After each step, STOP and wait for confirmation before proceeding
- Do not write the entire app at once
- Ask before making architectural decisions
- Keep components small and focused

## Current Status
[ ] Step 1: Expo project scaffolded with expo-gl + R3F installed
[ ] Step 2: Basic R3F scene renders on device (camera, lighting, empty scene)
[ ] Step 3: Ball (sphere) and Bat (cylinder) visible in scene, correct positions
[ ] Step 4: Tap button triggers bat swing animation
[ ] Step 5: Ball pitches toward camera on loop
[ ] Step 6: Hit detection — contact triggers ball launch
[ ] Step 7: Miss detection — 3 strikes → game over
[ ] Step 8: HUD overlay (strikes, score, tap prompt)
[ ] Step 9: Drei Trail effect on bat swing
[ ] Step 10: Swap procedural bat for GLTF model
