"use client";

interface ChevronNavProps {
  targetId: string;
  color?: string;
}

export default function ChevronNav({
  targetId,
  color = "#c41e3a",
}: ChevronNavProps) {
  const handleClick = () => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={handleClick}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer border-none bg-transparent p-2 transition-all duration-200 hover:opacity-100 group"
      aria-label={`Scroll to ${targetId}`}
      style={{
        animation: "pulseMinimal 2s ease-in-out infinite",
      }}
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
        className="transition-transform duration-200 group-hover:translate-y-1"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </button>
  );
}
