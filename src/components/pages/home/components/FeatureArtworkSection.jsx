"use client";

import React from 'react';
import SectionHeader from './SectionHeader';
import ArtworkInfoCard from '@/components/pages/artworks/ArtworkInfoCard';

const FeatureArtworkSection = ({ 
  artworks, 
  fallbackArtworks, 
  onCardClick, 
  cardFields,
  fontFamily, 
  onShowMore,
  isCn
}) => {
  // Determine which artworks to display
  const hasFeaturedArtworks = artworks && artworks.length > 0;
  const hasRandomArtworks = fallbackArtworks && fallbackArtworks.length > 0;
  
  // If no artworks at all, show nothing
  if (!hasFeaturedArtworks && !hasRandomArtworks) {
    return null;
  }

  // Use featured artworks if available, otherwise use random artworks
  const displayArtworks = hasFeaturedArtworks ? artworks : fallbackArtworks;

  return (
    <section 
      className="py-16 px-4 sm:px-6 lg:px-8"
      style={{ 
        fontFamily,
        backgroundColor: "transparent"
      }}
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeader 
          title={isCn ? '精选作品' : 'FEATURED ARTWORKS'}
          onViewAll={onShowMore}
          fontFamily={fontFamily}
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayArtworks.slice(0, 6).map((artwork, index) => (
            <div
              key={artwork?._id || artwork?.id || index}
              className="w-full cursor-pointer transition-all duration-300 hover:shadow-lg"
              onClick={() => onCardClick(artwork)}
            >
              <ArtworkInfoCard
                item={artwork}
                fields={cardFields}
                imageKey="cover_img_url"
                isCn={isCn}
                onCardClick={() => onCardClick(artwork)}
                style={{ fontFamily }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureArtworkSection;