// Utility to initialize floating code particles in a container
// Returns a cleanup function that stops spawning and removes existing particles.

export interface InitCodeParticlesOptions {
  initialCount?: number; // how many particles to schedule initially
  spawnIntervalMs?: number; // interval between spawns
  maxLifetimeMs?: number; // lifetime before removal
  codeElements?: string[]; // custom code tokens
  minAnimDurationSec?: number;
  maxExtraAnimDurationSec?: number; // random additional duration
  minAnimDelaySec?: number;
  maxAnimDelaySec?: number;
}

const DEFAULT_CODE_ELEMENTS = [
  "for()",
  "while()",
  "if()",
  "class",
  "function",
  "return",
  "var",
  "let",
  "const",
  "{}",
  "[]",
  "()",
  "=>",
  "==",
  "!=",
  "++",
  "--",
  "&&",
  "||",
  "int",
  "string",
  "bool",
  "array",
  "list",
  "dict",
  "map",
];

export function initCodeParticles(
  container: HTMLElement,
  {
    initialCount = 5,
    spawnIntervalMs = 2000,
    maxLifetimeMs = 25000,
    codeElements = DEFAULT_CODE_ELEMENTS,
    minAnimDurationSec = 10,
    maxExtraAnimDurationSec = 10,
    minAnimDelaySec = 0,
    maxAnimDelaySec = 2,
  }: InitCodeParticlesOptions = {}
): () => void {
  const particles: HTMLElement[] = [];
  const timeouts: number[] = [];

  const addParticle = () => {
    const p = document.createElement("div");
    p.className = "particle";
    p.textContent = codeElements[Math.floor(Math.random() * codeElements.length)];
    p.style.left = Math.random() * 100 + "vw";
    const delay = Math.random() * (maxAnimDelaySec - minAnimDelaySec) + minAnimDelaySec;
    const dur =
      Math.random() * maxExtraAnimDurationSec + minAnimDurationSec;
    p.style.animationDelay = delay + "s";
    p.style.animationDuration = dur + "s";

    container.appendChild(p);
    particles.push(p);

    const removalTimeout = window.setTimeout(() => {
      if (p.parentNode) p.parentNode.removeChild(p);
    }, maxLifetimeMs);
    timeouts.push(removalTimeout);
  };

  // schedule initial particles with slight staggering
  for (let i = 0; i < initialCount; i++) {
    const t = window.setTimeout(addParticle, i * 500);
    timeouts.push(t);
  }

  const intervalId = window.setInterval(addParticle, spawnIntervalMs);

  // Cleanup
  return () => {
    window.clearInterval(intervalId);
    timeouts.forEach((t) => window.clearTimeout(t));
    particles.forEach((p) => p.remove());
  };
}
