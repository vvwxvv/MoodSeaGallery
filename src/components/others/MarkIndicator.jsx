import { motion } from 'framer-motion';

const MarkIndicator = ({ mark, isCn }) => (
  mark === 'Slider' ? (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="absolute bottom-2 right-2 w-3 h-3 bg-black rounded-full z-10 shadow-md"
      title={isCn ? '特色' : 'Featured'}
    />
  ) : null
);

export default MarkIndicator;