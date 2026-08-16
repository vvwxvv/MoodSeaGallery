import { motion } from 'framer-motion';

const SliderDotToggleForMark = ({ mark, isCn = false }) => (
    mark === 'Slider' ? (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="absolute bottom-2 right-2 w-3 h-3 bg-black rounded-full z-10 shadow-md"
        title={isCn ? '轮播图' : 'Slider'}
      />
    ) : null
  );

  export default SliderDotToggleForMark;