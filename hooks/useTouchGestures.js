import { useState, useCallback } from 'react';

export const useTouchGestures = (enabled, onNext, onPrev) => {
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
  
    const handleTouchStart = useCallback((e) => {
      if (!enabled) return;
      setTouchStart(e.targetTouches[0].clientX);
    }, [enabled]);
  
    const handleTouchMove = useCallback((e) => {
      if (!enabled) return;
      setTouchEnd(e.targetTouches[0].clientX);
    }, [enabled]);
  
    const handleTouchEnd = useCallback(() => {
      if (!enabled || !touchStart || !touchEnd) return;
      
      if (touchUtils.isLeftSwipe(touchStart, touchEnd)) {
        onNext();
      } else if (touchUtils.isRightSwipe(touchStart, touchEnd)) {
        onPrev();
      }
    }, [enabled, touchStart, touchEnd, onNext, onPrev]);
  
    return { handleTouchStart, handleTouchMove, handleTouchEnd };
  };