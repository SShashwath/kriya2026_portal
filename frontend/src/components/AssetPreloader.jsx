/**
 * AssetPreloader.jsx
 * 
 * Preloads all heavy game images into the browser cache before
 * revealing the app. Shows a pirate-themed splash screen while loading.
 * 
 * Usage in App.jsx or main.jsx:
 *   <AssetPreloader>
 *     <App />
 *   </AssetPreloader>
 */

import { useState, useEffect } from "react";

// ─── All game assets to preload ────────────────────────────────────────────────
// Vite transforms these imports into hashed URLs at build time.
import roundbg    from "../assets/roundbg.png";
import island1    from "../assets/island1.png";
import island2    from "../assets/island2.png";
import island3    from "../assets/island3.png";
import obj1       from "../assets/obj1.png";
import obj2       from "../assets/obj2.png";
import obj3       from "../assets/obj3.png";
import obj4       from "../assets/obj4.png";
import shovel     from "../assets/shovel.png";
import shovel1    from "../assets/shovel1.png";
import round      from "../assets/round.png";
import psglogo    from "../assets/psglogo.png";

const ASSETS = [
  roundbg, island1, island2, island3,
  obj1, obj2, obj3, obj4,
  shovel, shovel1, round, psglogo,
];

const PRELOAD_FLAG = "kriya_assets_preloaded";

// ─── Preload a single image ────────────────────────────────────────────────────
function loadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload  = () => resolve({ src, ok: true });
    img.onerror = () => resolve({ src, ok: false }); // never reject — just continue
    img.src = src;
  });
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function AssetPreloader({ children }) {
  // If already preloaded this session → skip splash entirely
  const alreadyLoaded = sessionStorage.getItem(PRELOAD_FLAG) === "1";

  const [progress, setProgress]   = useState(alreadyLoaded ? 100 : 0);
  const [ready, setReady]         = useState(alreadyLoaded);
  const [fadeOut, setFadeOut]     = useState(false);


  useEffect(() => {
    // Already loaded this session — browser has them cached, skip splash
    if (alreadyLoaded) return;

    let loaded = 0;
    const total = ASSETS.length;

    const promises = ASSETS.map((src) =>
      loadImage(src).then((result) => {
        loaded += 1;
        setProgress(Math.round((loaded / total) * 100));
        return result;
      })
    );

    Promise.all(promises).then(() => {
      // Mark as done for this browser session — no more splash on refresh
      sessionStorage.setItem(PRELOAD_FLAG, "1");

      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => setReady(true), 600);
      }, 400);
    });
  }, []); // eslint-disable-line

  if (ready) return children;

  return (
    <>
      {/* Render children hidden underneath so React mounts them early */}
      <div style={{ visibility: "hidden", position: "fixed", pointerEvents: "none" }}>
        {children}
      </div>

      {/* Splash screen overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          background: "radial-gradient(ellipse at center, #1a0a00 0%, #0a0500 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "2rem",
          opacity: fadeOut ? 0 : 1,
          transition: "opacity 0.6s ease",
          pointerEvents: fadeOut ? "none" : "all",
        }}
      >
        {/* Skull & Waves decoration */}
        <div style={{ fontSize: "4rem", animation: "preload-bob 2s ease-in-out infinite" }}>
          ☠️
        </div>

        {/* Title */}
        <div style={{
          fontFamily: "'Pirata One', cursive",
          fontSize: "clamp(1.6rem, 4vw, 2.8rem)",
          color: "#c9a84c",
          textAlign: "center",
          letterSpacing: "0.08em",
          textShadow: "0 0 30px rgba(201,168,76,0.6)",
        }}>
          Code Quest
          <div style={{
            fontSize: "clamp(0.75rem, 2vw, 1rem)",
            color: "#8b6914",
            marginTop: "0.3rem",
            fontFamily: "serif",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}>
            Charting the seas…
          </div>
        </div>

        {/* Progress bar track */}
        <div style={{
          width: "clamp(200px, 40vw, 360px)",
          height: "8px",
          background: "rgba(255,255,255,0.08)",
          borderRadius: "999px",
          overflow: "hidden",
          border: "1px solid rgba(201,168,76,0.2)",
        }}>
          <div style={{
            height: "100%",
            width: `${progress}%`,
            background: "linear-gradient(90deg, #7a4a00, #c9a84c, #ffe082)",
            borderRadius: "999px",
            transition: "width 0.3s ease",
            boxShadow: "0 0 12px rgba(201,168,76,0.7)",
          }} />
        </div>

        {/* Percentage */}
        <div style={{
          fontFamily: "monospace",
          fontSize: "0.9rem",
          color: "rgba(201,168,76,0.7)",
          letterSpacing: "0.1em",
        }}>
          {progress < 100 ? `Loading treasure maps… ${progress}%` : "All hands on deck! ⚓"}
        </div>

        {/* Wave decoration */}
        <div style={{
          position: "absolute",
          bottom: "2rem",
          fontSize: "1.5rem",
          opacity: 0.25,
          letterSpacing: "0.5rem",
          animation: "preload-wave 3s ease-in-out infinite",
        }}>
          〰〰〰〰〰〰〰〰
        </div>
      </div>

      {/* Keyframe animations injected inline */}
      <style>{`
        @keyframes preload-bob {
          0%, 100% { transform: translateY(0px) rotate(-3deg); }
          50%       { transform: translateY(-12px) rotate(3deg); }
        }
        @keyframes preload-wave {
          0%, 100% { transform: translateX(0); opacity: 0.25; }
          50%       { transform: translateX(-20px); opacity: 0.15; }
        }
      `}</style>
    </>
  );
}
