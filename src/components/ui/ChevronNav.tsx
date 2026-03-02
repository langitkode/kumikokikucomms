"use client";

interface ChevronNavProps {
  targetId: string;
  color?: string;
}

export default function ChevronNav({ targetId, color = "#f9963d" }: ChevronNavProps) {
  const handleClick = () => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={handleClick}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer border-none bg-transparent p-2 transition-all duration-300 hover:opacity-100 group"
      aria-label={`Scroll to ${targetId}`}
      style={{
        animation: "bounceDown 2s ease-in-out infinite",
      }}
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-transform duration-300 group-hover:translate-y-1"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
      {/* Glow effect */}
      <div
        className="absolute inset-0 blur-md opacity-50 group-hover:opacity-80 transition-opacity"
        style={{ background: color }}
      />
    </button>
  );
}
