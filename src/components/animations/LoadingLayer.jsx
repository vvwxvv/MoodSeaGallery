import React from "react";
import { motion } from "framer-motion";
const LoadingLayer = ({ isLoading }) => {


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
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoading ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >

    </motion.div>
  );
};

export default LoadingLayer;