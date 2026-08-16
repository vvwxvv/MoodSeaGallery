"use client";

import React, { useContext, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
// Context & Hooks
import { LanguageContext } from '@/components/contexts/LanguageContext';
import useData from '@/hooks/useData';
import useFont from '@/hooks/useFont';
import useFilterState from '@/hooks/useFilterState';
import useArtworkData from '@/components/artworks/hooks/useArtworkData';
import useEventData from '@/hooks/useEventData';
import { useWindowSize } from '@/hooks/useWindowSize';
import { useReverseTheme } from '@/hooks/useReverseTheme';

// Components
import LoadingAnimation from '@/components/animations/LoadingAnimation';
import NoDataInfo from '@/components/alerts/NoDataInfo';
import AlertInfo from '@/components/alerts/AlertInfo';

// Config & Utils
import { artworkConfig } from '@/components/configs/artworkConfig';
import { imageConfig } from '@/components/configs/imageConfig';
import { eventConfig } from '@/components/configs/eventConfig';
import { MOBILE_BREAKPOINT } from '@/components/configs/general_config';
import { getSystemLabel } from '@/components/labels/system_labels';
import ImageSliderSection from '@/components/images/ImageSliderSection';
import FeatureEventSection from '@/components/pages/home/FeatureEventSection';
import FeatureArtworkSection from '@/components/pages/home/FeatureArtworkSection';
import DividerLine from '@/components/others/DividerLine';


const getUIText = (isCn) => ({
  series: getSystemLabel('series', isCn),
  type: getSystemLabel('type', isCn),
  all: getSystemLabel('all', isCn),
  artworkIndex: getSystemLabel('artworkIndex', isCn),
  viewArtworkIndex: getSystemLabel('viewArtworkIndex', isCn),
  loadingError: getSystemLabel('connectionFailed', isCn),
  systemError: getSystemLabel('systemUnavailable', isCn),
  tryAgain: getSystemLabel('tryAgain', isCn),
  noFeaturedArtworks: getSystemLabel('noFeaturedArtworks', isCn),
  noFeaturedEvents: getSystemLabel('noFeaturedEvents', isCn),
  exhibitions: getSystemLabel('exhibitions', isCn)
});

const getArtworkInfoCardFields = (isCn) => [
  { key: 'title', label: getSystemLabel('title', isCn) },
  { key: 'type', label: getSystemLabel('type', isCn) },
  { key: 'year', label: getSystemLabel('year', isCn) },
  { key: 'artist', label: getSystemLabel('artist', isCn) },
  { key: 'series', label: getSystemLabel('series', isCn) },
  { key: 'medium', label: getSystemLabel('medium', isCn) },
  { key: 'size', label: getSystemLabel('size', isCn) },
  { key: 'caption', label: getSystemLabel('caption', isCn) }
];

const sortByOrder = (items) => {
  return items.slice().sort((a, b) => {
    const orderA = Number(a?.order) || 0;
    const orderB = Number(b?.order) || 0;
    return orderA - orderB;
  });
};

// Shuffle array randomly
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// =============================================================================
// CUSTOM HOOKS
// =============================================================================

// ------------------------------------------------------------------
// 1.  DATA HOOK – unchanged (no sorting here)
// ------------------------------------------------------------------
const useHomePageData = () => {
  const artworks = useData(artworkConfig?.api?.endpoints?.list);
  const rawImages = useData(imageConfig?.api?.endpoints?.list);
  const events   = useData(eventConfig?.api?.endpoints?.list);

  const isLoading = artworks.isLoading || rawImages.isLoading || events.isLoading;
  const hasError  = artworks.error || rawImages.error || events.error;
  const isEmpty   = artworks.data.length === 0 &&
                    rawImages.data.length === 0 &&
                    events.data.length === 0;

  const refetchAll = useCallback(() => {
    artworks.refetch();
    rawImages.refetch();
    events.refetch();
  }, [artworks, rawImages, events]);

  return {
    artworks:   artworks.data,
    rawImages:  rawImages.data,
    events:     events.data,
    isLoading:  isLoading || isEmpty,
    hasError,
    refetchAll
  };
};

// ------------------------------------------------------------------
// 2.  FEATURED-ARTWORK HOOK – now ALWAYS year-descending
// ------------------------------------------------------------------
const sortByYearDesc = (items) =>
  items.slice().sort((a, b) => {
    const yA = Number(a?.year) || 0;
    const yB = Number(b?.year) || 0;
    return yB - yA;          // newest → oldest
  });

const useFeaturedArtworks = (filteredArtworks, selectedSeries, selectedType, search) =>
  useMemo(() => {
    if (!filteredArtworks?.length)
      return { featuredArtworks: [], fallbackArtworks: [] };

    const hasActiveFilters = selectedSeries || selectedType || search;

    /* ----------  A.  Filters active  ---------- */
    if (hasActiveFilters) {
      return {
        featuredArtworks: sortByYearDesc(filteredArtworks),
        fallbackArtworks: []
      };
    }

    /* ----------  B.  No filters – use “featured” mark  ---------- */
    const featured = filteredArtworks.filter(
      art => ['feature', 'Feature'].includes(art?.mark)
    );

    if (featured.length) {
      return {
        featuredArtworks: sortByYearDesc(featured),
        fallbackArtworks: []
      };
    }

    /* ----------  C.  No featured items – random fallback  ---------- */
    const randomArtworks = shuffleArray(filteredArtworks).slice(0, 6);
    return {
      featuredArtworks: [],
      fallbackArtworks: sortByYearDesc(randomArtworks) // also year-sorted
    };
  }, [filteredArtworks, selectedSeries, selectedType, search]);

// =============================================================================
// MAIN COMPONENT
// =============================================================================

const HomePage = () => {
  // Context & Basic Hooks
  const { isCn } = useContext(LanguageContext);
  const router = useRouter();
  const { width } = useWindowSize();
  const { fontFamily } = useFont();
  const { colors } = useReverseTheme();
  
  // Filter State
  const {
    search,
    selectedPrimary: selectedSeries,
    selectedSecondary: selectedType,
  } = useFilterState('series', 'type');

  // Data Fetching
  const { artworks, rawImages, events, isLoading, hasError, refetchAll } = useHomePageData();

  // Data Processing
  const { filteredArtworks, sliderImages } = useArtworkData(
    artworks, 
    rawImages, 
    isCn, 
    search, 
    selectedSeries, 
    selectedType
  );

  const { featuredEvents } = useEventData(events, isCn, search);
  
  const { featuredArtworks, fallbackArtworks } = useFeaturedArtworks(
    filteredArtworks, 
    selectedSeries, 
    selectedType, 
    search
  );

  // Computed Values
  const isMobile = width < MOBILE_BREAKPOINT;
  const uiText = getUIText(isCn);
  const cardFields = getArtworkInfoCardFields(isCn);

  // Event Handlers
  const handleCardClick = useCallback((artwork) => {
    if (!artwork) return;
    const slug = artwork.slug || artwork._id;
    if (slug) router.push(`/artworks/${slug}`);
  }, [router]);

  const handleEventClick = useCallback((event) => {
    if (isMobile || !event) return;
    const slug = event.slug || event._id || event.id;
    if (slug) router.push(`/events/${slug}`);
  }, [isMobile, router]);

  const handleShowMore = useCallback(() => {
    router.push('/artworks');
  }, [router]);

  // Loading State
  if (isLoading) {
    return <LoadingAnimation isLoading={true} />;
  }

  // Error State
  if (hasError) {
    return (
      <AlertInfo
        message={uiText.loadingError}
        subMessage={uiText.systemError}
        buttonText={uiText.tryAgain}
        messageCn={uiText.loadingError}
        subMessageCn={uiText.systemError}
        buttonTextCn={uiText.tryAgain}
        onBack={refetchAll}
        isCn={isCn}
      />
    );
  }

  // No Data State
  if (!filteredArtworks?.length) {
    return <NoDataInfo schemaName="artwork" isCn={isCn} />;
  }

  // Main Render
  return (
    <div 
      className="min-h-screen"
      style={{ 
        fontFamily,
        backgroundColor: "transparent"
      }}
    >
      {/* Hero Slider */}
      <ImageSliderSection images={sliderImages} fontFamily={fontFamily} />
      
      <DividerLine colors={colors} marginY={2} height="2px" />
      
      {/* Events Section */}
      <FeatureEventSection
        events={featuredEvents}
        loading={false}
        onEventClick={handleEventClick}
        rawImages={rawImages}
        fontFamily={fontFamily}
        isCn={isCn}
      />
      
      <DividerLine colors={colors} marginY={4} height="1.5px" />
      
      {/* Artworks Grid */}
      <FeatureArtworkSection
        artworks={featuredArtworks}
        fallbackArtworks={fallbackArtworks}
        onCardClick={handleCardClick}
        cardFields={cardFields}
        isCn={isCn}
        fontFamily={fontFamily}
        onShowMore={handleShowMore}
      />
    </div>
  );
};

export default HomePage;
