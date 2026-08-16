import React, { useContext } from "react";
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { LanguageContext } from "../contexts/LanguageContext";
import useFont from "@/hooks/useFont";
import useBackgroundColor from "@/hooks/useBackgroundColor";
import ThemeSwitcher from "@/components/switchers/ThemeSwitcher";
import { useReverseTheme } from '@/hooks/useReverseTheme';
import { DeviceContext } from "@/components/contexts/DeviceContext";

const Footer = () => {
  const { isCn, isLoading } = useContext(LanguageContext);
  const { isMobile } = useContext(DeviceContext);
  const { contentFontFamily } = useFont('13px');
  const { colors } = useReverseTheme();
  
  // Background color hook
  const { getBackgroundStyle } = useBackgroundColor('transparent', {
    useCustomColor: true
  });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  // Get person name from environment variables based on language
  const personName = isCn 
    ? (process.env.NEXT_PUBLIC_APP_PERSON_CN || '')
    : (process.env.NEXT_PUBLIC_APP_PERSON_EN || '');
  
  // Get rights reserved text based on language
  const rightsReserved = isCn ? '保留所有权利' : 'All rights reserved';
  
  // Create copyright with current year and person name
  const currentYear = new Date().getFullYear();
  const copyright = isLoading 
    ? `© ${currentYear} ${isCn ? '' : ''}. ${rightsReserved}.`
    : `© ${currentYear} ${personName}. ${rightsReserved}.`;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="fixed bottom-0 left-0 w-full z-50"
      style={{
        backgroundColor: colors.background,
        borderTop: `1px solid ${colors.border || '#e0e0e0'}`,
        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)'
      }}
    >
      <div 
        className="flex items-center justify-center px-4 py-2"
        style={{ backgroundColor: colors.background }}
      >
        <div 
          className="text-xs tracking-wider uppercase"
          style={{
            color: colors.text,
            fontFamily: contentFontFamily,
            fontSize: '13px',
            backgroundColor: colors.background
          }}
        >
          {copyright}
        </div>
      </div>
    </motion.div>
  );
};

export default Footer;

