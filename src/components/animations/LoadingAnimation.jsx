import React, { useContext } from "react";
import { motion } from "framer-motion";
import useFont from '@/hooks/useFont';
import { useReverseTheme } from '@/hooks/useReverseTheme';

const LoadingAnimation = ({ isLoading }) => {
  const { contentFontFamily } = useFont();
  const { colors } = useReverseTheme();
  
  const animationProps = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: isLoading ? 1 : 0, y: isLoading ? 0 : -10 },
    transition: { duration: 0.3 },
  };

  const letters = ["L", "o", "a", "d", "i", "n", "g", ".", ".", "."];

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'transparent',
        zIndex: isLoading ? 999 : -1,
      }}
      className="loading-animation-override"
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoading ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Cool animated spinner */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
        style={{
          width: 96,
          height: 96,
          border: `10px solid ${colors.text}40`,
          borderTop: `10px solid ${colors.text}`,
          borderRadius: '50%',
          marginBottom: 32,
          backgroundColor: 'transparent',
          boxShadow: 'none'
        }}
      />
      {/* Loading text */}
      <motion.div style={{ display: "flex",backgroundColor: 'transparent' }}>
        {letters.map((letter, index) => (
          <motion.div
            key={index}
            style={{
               marginLeft: "5px",
               fontSize:"32px",
               fontFamily: contentFontFamily,
               fontWeight: 700,
               color: colors.text,
               letterSpacing: 2,
               backgroundColor: 'transparent',
               textShadow: 'none'
             }}
            {...animationProps}
            transition={{
              ...animationProps.transition,
              delay: isLoading ? index * 0.15 : 0,
            }}
          >
          {letter}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default LoadingAnimation;