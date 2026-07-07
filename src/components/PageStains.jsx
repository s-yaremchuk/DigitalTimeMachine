import React, { useMemo } from 'react';

// Seeded random number generator (mulberry32)
function createRandom(seedStr) {
  let h = 0;
  for (let i = 0; i < seedStr.length; i++) {
    h = Math.imul(31, h) + seedStr.charCodeAt(i) | 0;
  }
  return function() {
    let t = h += 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function PageStains({ date }) {
  const stains = useMemo(() => {
    if (!date) return [];
    const rand = createRandom(date);
    
    // Determine number of stains: 1 to 3
    const count = Math.floor(rand() * 3) + 1;
    
    // We have 6 potential positioning zones in margins/corners to prevent overlapping content
    const zones = [
      { id: 'top-left', style: { top: '2%', left: '2%' } },
      { id: 'top-right', style: { top: '3%', right: '2%' } },
      { id: 'bottom-left', style: { bottom: '2%', left: '2%' } },
      { id: 'bottom-right', style: { bottom: '3%', right: '2%' } },
      { id: 'middle-left', style: { top: `${35 + rand() * 15}%`, left: '0.5%' } },
      { id: 'middle-right', style: { top: `${35 + rand() * 15}%`, right: '0.5%' } },
    ];
    
    // Shuffle zones deterministically
    for (let i = zones.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [zones[i], zones[j]] = [zones[j], zones[i]];
    }
    
    const generated = [];
    for (let i = 0; i < count; i++) {
      const zone = zones[i];
      const type = Math.floor(rand() * 3); // 0: coffee ring, 1: ink blot, 2: smudge
      const size = Math.floor(rand() * 80) + 80; // 80px to 160px
      const rotate = Math.floor(rand() * 360);
      const opacity = (rand() * 0.07 + 0.05).toFixed(3); // 0.05 to 0.12
      const isCoffee = rand() > 0.4; // 60% chance of coffee, 40% ink
      
      generated.push({
        id: `${date}-stain-${i}`,
        zoneId: zone.id,
        style: {
          ...zone.style,
          width: `${size}px`,
          height: `${size}px`,
          transform: `rotate(${rotate}deg)`,
          opacity: opacity,
        },
        type,
        isCoffee
      });
    }
    
    return generated;
  }, [date]);

  return (
    <div className="page-stains-container" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
      {/* SVG Filters for organic displacement */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="stain-displacement">
            <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="4" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="18" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="splatter-displacement">
            <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {stains.map((stain) => {
        const fillColor = stain.isCoffee ? 'rgb(117, 72, 33)' : 'rgb(20, 20, 20)';
        
        return (
          <div key={stain.id} style={{ position: 'absolute', ...stain.style }}>
            {stain.type === 0 && (
              // 0: Coffee Ring
              <svg viewBox="0 0 100 100" width="100%" height="100%">
                <circle 
                  cx="50" 
                  cy="50" 
                  r="38" 
                  fill="none" 
                  stroke={fillColor} 
                  strokeWidth="5" 
                  strokeDasharray="95 10 40 8 70 12"
                  filter="url(#stain-displacement)"
                />
                <circle 
                  cx="50" 
                  cy="50" 
                  r="37" 
                  fill="none" 
                  stroke={fillColor} 
                  strokeWidth="1.5" 
                  opacity="0.6"
                  filter="url(#stain-displacement)"
                />
                {/* Coffee drips */}
                <circle cx="25" cy="70" r="4" fill={fillColor} filter="url(#stain-displacement)" />
                <path d="M 50,88 Q 52,94 48,96 Z" fill={fillColor} filter="url(#stain-displacement)" />
              </svg>
            )}

            {stain.type === 1 && (
              // 1: Ink Blot
              <svg viewBox="0 0 100 100" width="100%" height="100%" filter="url(#stain-displacement)">
                <path 
                  d="M 50,15 C 65,15 80,30 80,50 C 80,68 62,82 50,82 C 32,82 20,68 20,50 C 20,30 35,15 50,15 Z" 
                  fill={fillColor} 
                />
                {/* Splatters fanning out */}
                <circle cx="15" cy="30" r="3" fill={fillColor} />
                <circle cx="85" cy="65" r="4" fill={fillColor} />
                <circle cx="35" cy="85" r="2.5" fill={fillColor} />
                <circle cx="70" cy="20" r="3.5" fill={fillColor} />
              </svg>
            )}

            {stain.type === 2 && (
              // 2: Smudge
              <svg viewBox="0 0 100 100" width="100%" height="100%" filter="url(#splatter-displacement)">
                <ellipse cx="50" cy="50" rx="42" ry="18" fill={fillColor} opacity="0.8" />
                <path d="M 12,50 Q 50,45 88,50 Q 50,55 12,50 Z" fill={fillColor} />
                {/* Fingerprint ridges feel */}
                <ellipse cx="50" cy="50" rx="35" ry="12" fill="none" stroke="#F4F1EA" strokeWidth="1" opacity="0.3" />
                <ellipse cx="50" cy="50" rx="25" ry="8" fill="none" stroke="#F4F1EA" strokeWidth="1" opacity="0.3" />
              </svg>
            )}
          </div>
        );
      })}
    </div>
  );
}
