import React from "react";
import { motion } from "framer-motion";

const IncreaseScaleOnhover = (props) => {
  const { children } = props;

  return (
    <motion.div
      whileHover={{
        scale: 1.1,
        textShadow: "0px 0px 4px gray"
      }}
    >
      {children}
    </motion.div>
  );
};

export default IncreaseScaleOnhover;


