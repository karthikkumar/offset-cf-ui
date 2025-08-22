import React from 'react';

interface LogoProps {
  width?: string | number;
  height?: string | number;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ width = '100%', height = 100, className = '' }) => {
  // Convert width and height to numbers for calculations
  const widthNum = typeof width === 'string' ? parseInt(width) : width;
  const heightNum = typeof height === 'string' ? parseInt(height) : height;
  
  // Calculate dynamic font size based on height (maintains proportions)
  const fontSize = Math.round(heightNum * 0.6); // Increased from 0.28 to 0.6
  const letterSpacing = Math.round(heightNum * 0.004); // Increased from 0.002 to 0.004
  
  // Calculate text positioning (center of the SVG)
  const centerX = widthNum / 2;
  const centerY = heightNum / 2;
  
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox={`0 0 ${widthNum} ${heightNum}`}
      xmlns="http://www.w3.org/2000/svg" 
      role="img" 
      aria-labelledby="title"
      className={className}
    >
      <title id="title">offsetCF logo</title>
      <style>
        {`.text { font: 800 ${fontSize}px/1.1 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; letter-spacing: ${letterSpacing}px; }`}
      </style>
      <text 
        x={centerX} 
        y={centerY} 
        textAnchor="middle" 
        dominantBaseline="middle" 
        className="text" 
        fill="#1F7A3A"
      >
        offset<tspan fill="#3AA0D8">CF</tspan>
      </text>
    </svg>
  );
};

export default Logo;
