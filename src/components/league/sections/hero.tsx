"use client";

import { useEffect, useRef, useState } from "react";

export function Hero() {
  const particlesRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLHeadingElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoVisible, setVideoVisible] = useState(false);
  // Hardcoded fallback test video URL (CC0)
  const videoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

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
    // Try to play video background (fallback to CSS if fails)
    const v = videoRef.current;
    if (!videoUrl || !v) return;

    const onLoaded = () => setVideoVisible(true);
    const onError = () => setVideoVisible(false);

    v.addEventListener("loadeddata", onLoaded);
    v.addEventListener("error", onError);

    // Attempt to play (muted + playsInline should allow autoplay)
    try {
      const maybePromise = v.play();
      if (maybePromise && typeof (maybePromise as Promise<void>).then === "function") {
        (maybePromise as Promise<void>).catch(() => {
          // Ignore autoplay rejection; keep showing the first frame
        });
      }
    } catch {
      // Ignore; fallback handled by safety timeout and error event
    }

    // Safety timeout: if it doesn't get ready in time, fallback
    const readyTimeout = window.setTimeout(() => {
      if (v.readyState < 2) setVideoVisible(false);
    }, 4000);

    return () => {
      v.removeEventListener("loadeddata", onLoaded);
      v.removeEventListener("error", onError);
      window.clearTimeout(readyTimeout);
    };
  }, [videoUrl]);

  useEffect(() => {
    // Toggle helper class on hero when video is visible to soften overlays
    const el = heroRef.current;
    if (!el) return;
    if (videoVisible) el.classList.add("has-video");
    else el.classList.remove("has-video");
  }, [videoVisible]);

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
      {/* background video layer (fallback to CSS background if hidden) */}
      {videoUrl ? (
        <div className={`hero-video-bg ${videoVisible ? "is-visible" : ""}`}>
          <video
            ref={videoRef}
            src={videoUrl}
            muted
            autoPlay
            loop
            playsInline
            preload="auto"
            crossOrigin="anonymous"
            aria-hidden="true"
          />
        </div>
      ) : null}

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
