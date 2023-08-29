import { motion } from "framer-motion";

// once a user goes back and comes abck again the loading does not happen correctly
export default function Spinner() {
  const spinTransition = {
    repeat: Infinity,
    ease: "easeInOut",
    duration: 1
  };
  return (
    <div className="spinner">
      <motion.span
        className="circle"
        animate={{ rotate: 360 }}
        transition={spinTransition}
      />
    </div>
  );
}
