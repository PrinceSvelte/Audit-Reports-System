import React from "react";

type DonutProps = {
  size?: number; // overall width/height in px
  thickness?: number; // ring thickness in px
  value?: number; // 0..1 (fill percentage)
  trackColor?: string; // background ring color
  color?: string; // fill ring color
  centerText?: number; // text inside the donut
  label?: string; // text under the donut
  textColor?: string; // center text color
  fontWeight?: number | string;
};

export function DonutBadge({
  size = 110,
  thickness = 16,
  value = 1, // 1 = 100% filled (like your screenshot)
  trackColor = "#e5e7eb", // gray-200
  color = "#ef4444", // red-500
  centerText = 0,
  label = "High",
  textColor = "#111827", // gray-900
  fontWeight = 700,
}: DonutProps) {
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(1, value));
  const dash = clamped * circumference;
  const gap = circumference - dash;

  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ display: "block" }}
      >
        <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={trackColor}
            strokeWidth={thickness}
          />
          {/* Fill */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={thickness}
            strokeDasharray={`${dash} ${gap}`}
            strokeLinecap="butt"
          />
        </g>

        {/* Center text (upright) */}
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill={textColor}
          fontSize={size * 0.2}
          fontWeight={fontWeight}
        >
          {centerText}
        </text>
      </svg>

      {label ? (
        <div style={{ marginTop: 8, fontWeight: 700, color: textColor }}>
          {label}
        </div>
      ) : null}
    </div>
  );
}
