import React from 'react';

export default function NewspaperArticle({ rubric, children, className = '' }) {
  return (
    <article className={`newspaper-article ${className}`}>
      {rubric && (
        <div className="article-rubric font-sans-meta">
          {rubric}
        </div>
      )}
      <div className="article-content">
        {children}
      </div>
    </article>
  );
}
