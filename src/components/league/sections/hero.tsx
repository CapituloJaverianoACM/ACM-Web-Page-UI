"use client";

import { useEffect, useRef } from "react";

export function Hero() {
  const particlesRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLHeadingElement | null>(null);

  // Typing animation util
  function typeText(
    el: HTMLElement,
    text: string,
    speed = 30,
    onDone?: () => void
  ) {
    let i = 0;
    el.innerHTML = "";
    const cursor = document.createElement("span");
    cursor.className = "typing-cursor";
    cursor.textContent = "|";
    el.appendChild(cursor);

    const tick = () => {
      if (i < text.length) {
        cursor.before(document.createTextNode(text[i]));
        i++;
        setTimeout(tick, speed);
      } else {
        cursor.remove();
        onDone?.();
      }
    };

    tick();
  }

  useEffect(() => {
    // Particles
    const container = particlesRef.current;
    if (!container) return;

    const codeElements = [
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

    const particles: HTMLElement[] = [];

    const addParticle = () => {
      const p = document.createElement("div");
      p.className = "particle";
      p.textContent =
        codeElements[Math.floor(Math.random() * codeElements.length)];
      p.style.left = Math.random() * 100 + "vw";
      p.style.animationDelay = Math.random() * 2 + "s";
      p.style.animationDuration = Math.random() * 10 + 10 + "s";

      container.appendChild(p);
      particles.push(p);

      // remove after animation
      window.setTimeout(() => {
        if (p.parentNode) p.parentNode.removeChild(p);
      }, 25000);
    };

    // initial particles
    for (let i = 0; i < 5; i++) setTimeout(addParticle, i * 500);
    const id = window.setInterval(addParticle, 2000);

    return () => {
      window.clearInterval(id);
      particles.forEach((p) => p.remove());
    };
  }, []);

  useEffect(() => {
    // Typing sequence
    const titleEl = titleRef.current;
    const subtitleEl = subtitleRef.current;
    if (!titleEl || !subtitleEl) return;

    const timeoutId = window.setTimeout(() => {
      typeText(titleEl, "La Liga", 30, () => {
        window.setTimeout(() => typeText(subtitleEl, "Javeriana de Programación", 30), 300);
      });
    }, 2000);

    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <section ref={heroRef} className="league-hero">
      {/* dynamic particles layer */}
      <div ref={particlesRef} className="code-particles" />

      {/* geometric background shapes */}
      <div className="geometric-bg">
        <div className="geometric-shape shape-1" />
        <div className="geometric-shape shape-2" />
        <div className="geometric-shape shape-3" />
        <div className="geometric-shape shape-4" />
      </div>

      {/* decorative code snippets */}
      <div className="code-snippet code-1">
        {"while(true) {"}
        <br />
        &nbsp;&nbsp;solve();
        <br />
        &nbsp;&nbsp;compete();
        <br />
        {"}"}
      </div>

      <div className="code-snippet code-2">
        {"def javeriana():"}
        <br />
        &nbsp;&nbsp;return &quot;excellence&quot;
      </div>

      <div className="code-snippet code-3">
        {"#include <passion>"}
        <br />
        {"#include <code>"}
      </div>

      <div className="hero-content">
        <h1 ref={titleRef} className="league-title" />
        <h2 ref={subtitleRef} className="league-subtitle" />

        <p className="league-text">
          Donde los algoritmos cobran vida y la pasión por el código nos une
        </p>

        <div className="cta-buttons">
          <a href="#" className="btn btn--niebla">
            🚀 Únete a la Liga
          </a>
          <a href="#upcoming-events" className="btn btn--niebla">
            📊 Ver Competencias
          </a>
        </div>

        {/*TODO: ESTAS STATS SON DE EJEMPLO, CAMBIARLAS DESPUÉS PARA QUE MUESTREN DATOS REALES, PUEDE SER DE LA DB*/}
        <div className="stats">
          <div className="stat-item">
            <span className="stat-number">500+</span>
            <span className="stat-label">Participantes</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">50+</span>
            <span className="stat-label">Competencias</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">10+</span>
            <span className="stat-label">Años de Historia</span>
          </div>
        </div>
      </div>
    </section>
  );
}
