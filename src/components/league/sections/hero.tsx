"use client";

import { useEffect, useRef, useState } from "react";
import { typeText } from "@/utils/typeText";
import { initCodeParticles } from "@/utils/particles";

export function Hero() {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLHeadingElement | null>(null);
  const particlesRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoVisible, setVideoVisible] = useState(false);
  // Use cached proxy route for the hero video
  const videoUrl = "/api/hero-video";
  const externalFallback =
    "https://cdn.pixabay.com/video/2022/10/24/136283-764387738_large.mp4";

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
    // Partículas ahora usando utilidad reutilizable
    const container = particlesRef.current;
    if (!container) return;
    const cleanup = initCodeParticles(container, {
      initialCount: 5,
      spawnIntervalMs: 2000,
      maxLifetimeMs: 25000,
    });
    return cleanup;
  }, []);

  useEffect(() => {
    // Typing sequence
    const titleEl = titleRef.current;
    const subtitleEl = subtitleRef.current;
    if (!titleEl || !subtitleEl) return;

    let cancelTitle: VoidFunction | undefined;
    let cancelSubtitle: VoidFunction | undefined;
    const timeouts: number[] = [];

    const startId = window.setTimeout(() => {
      cancelTitle = typeText(titleEl, "La Liga", 30, () => {
        const id2 = window.setTimeout(() => {
          cancelSubtitle = typeText(subtitleEl, "Javeriana de Programación", 30);
        }, 300);
        timeouts.push(id2);
      });
    }, 2000);
    timeouts.push(startId);

    return () => {
      timeouts.forEach((t) => clearTimeout(t));
      cancelTitle?.();
      cancelSubtitle?.();
    };
  }, []);

  return (
    <section ref={heroRef} className="league-hero">
      {/* background video layer (fallback to CSS background if hidden) */}
      {videoUrl ? (
        <div className={`hero-video-bg ${videoVisible ? "is-visible" : ""}`}>
          <video
            ref={videoRef}
            muted
            autoPlay
            loop
            playsInline
            preload="auto"
            crossOrigin="anonymous"
            aria-hidden="true"
          >
            {/* Try proxy first, then external file as fallback */}
            <source src={videoUrl} type="video/mp4" />
            <source src={externalFallback} type="video/mp4" />
          </video>
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
            <span className="stat-number">10+</span>
            <span className="stat-label">Años Compitiendo</span>
          </div>
          {/*<div className="stat-item">
            <span className="stat-number">50+</span>
            <span className="stat-label">Competencias</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">10+</span>
            <span className="stat-label">Años de Historia</span>
          </div>*/}
        </div>
      </div>
    </section>
  );
}
