"use client";

import React, { useMemo } from 'react';
import EventsSliderRow from '@/components/pages/events/EventsSliderRow';

// Shuffle array randomly
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const FeatureEventSection = ({ 
  events, 
  loading, 
  onEventClick, 
  rawImages, 
  fontFamily, 
  isCn 
}) => {
  // Process events to show featured or random events
  const displayEvents = useMemo(() => {
    if (!events || events.length === 0) {
      return [];
    }

    // Filter for featured events
    const featuredEvents = events.filter(event => {
      const isFeatured = event?.mark === 'feature' || event?.mark === 'Feature';
      return isFeatured;
    });

    // If there are featured events, show them
    if (featuredEvents.length > 0) {
      return featuredEvents.slice(0, 3);
    }

    // If no featured events, randomly select 3 events
    const randomEvents = shuffleArray(events).slice(0, 3);
    return randomEvents;
  }, [events]);

  // If no events at all, return null (show nothing)
  if (displayEvents.length === 0) {
    return null;
  }

  return (
    <div 
      className="py-16 px-4 sm:px-6 lg:px-8" 
      style={{ backgroundColor: "transparent" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="w-full">
          <EventsSliderRow
            events={displayEvents}
            loading={loading}
            onEventClick={onEventClick}
            maxHeight={500}
            showActions={false}
            allImages={rawImages}
          />
        </div>
      </div>
    </div>
  );
};

export default FeatureEventSection;