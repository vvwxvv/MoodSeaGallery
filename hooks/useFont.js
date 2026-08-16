// hooks/useFont.js
'use client';
import { useContext, useMemo } from 'react';
import { LanguageContext } from '@/components/contexts/LanguageContext';
import { FONT_FACES, TYPE_SCALE } from '@/lib/typography';

export default function useFont(role) {
  const { isCn } = useContext(LanguageContext);
  const lang = isCn ? 'zh' : 'en';

  return useMemo(() => {
    // Default to 'body' role when none specified
    const effectiveRole = role || 'body';
    const spec = TYPE_SCALE[effectiveRole]?.[lang];
    if (!spec) {
      console.warn(`useFont: unknown role "${effectiveRole}"`);
      // Fallback to basic body text
      const fallbackWeight = FONT_FACES[lang]?.regular || 'sans-serif';
      return { fontFamily: fallbackWeight, style: {} };
    }

    const fontFamily = FONT_FACES[lang][spec.weight] || FONT_FACES[lang].regular || 'sans-serif';

    return {
      fontFamily,
      style: {
        fontFamily,
        fontSize: `${spec.fontSize}px`,
        lineHeight: `${spec.lineHeight}px`,
        letterSpacing: `${spec.letterSpacing}em`,
      },
    };
  }, [role, lang]);
}