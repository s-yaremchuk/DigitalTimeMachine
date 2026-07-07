import React from 'react';

export default function BrutalistCard({ title, icon, accent = 'yellow', children, className = '' }) {
  return (
    <div className={`brutalist-card card-${accent} ${className}`}>
      {/* Card Header Banner */}
      <div className="card-header">
        <span className="card-title">{title}</span>
        {icon && <div className="card-icon">{icon}</div>}
      </div>
      
      {/* Card Body */}
      <div className="card-body">
        {children}
      </div>
    </div>
  );
}
