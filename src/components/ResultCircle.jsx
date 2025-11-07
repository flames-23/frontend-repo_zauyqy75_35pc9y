import React from 'react';

const ResultCircle = ({ score, total }) => {
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-3">
      <svg width="120" height="120" className="rotate-[-90deg]">
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#1f2937"
          strokeWidth="12"
          fill="none"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#22c55e"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          fill="none"
        />
        <text
          x="60"
          y="66"
          textAnchor="middle"
          className="fill-white text-xl font-semibold rotate-[90deg]"
        >
          {score}/{total}
        </text>
      </svg>
      <div className="text-sm text-white/70">Your score</div>
    </div>
  );
};

export default ResultCircle;
