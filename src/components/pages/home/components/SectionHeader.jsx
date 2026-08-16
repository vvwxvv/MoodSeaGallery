import React, { useContext } from 'react';
import { LanguageContext } from '@/components/contexts/LanguageContext';

const SectionHeader = ({ title, onViewAll, fontFamily }) => {
  const { isCn } = useContext(LanguageContext);

  return (
    <div className="flex items-center justify-between mb-8">
      <h2 
        className="font-bold uppercase tracking-wider"
        style={{ 
          fontFamily,
          fontSize: "15px"
        }}
      >
        {title}
      </h2>
      
      <button
        onClick={onViewAll}
        className="flex items-center gap-2 font-medium hover:opacity-80 transition-opacity duration-200"
        style={{ 
          fontFamily,
          fontSize: "14px"
        }}
      >
        <span style={{ fontSize: "15px" }}>{isCn ? '更多作品' : 'VIEW MORE'}</span>
        <span style={{ fontSize: "15px" }}>→</span>
      </button>
    </div>
  );
};

export default SectionHeader;
