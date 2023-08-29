import { useEffect } from "react";

const useAutoResizeHeight = (currenRef, value) => {
  useEffect(() => {
    if (currenRef) {
      currenRef.style.height = "0px";
      const scrollHeight = currenRef.scrollHeight;
      currenRef.style.height = scrollHeight + "px";
    }
  }, [value, currenRef]);
};

export default useAutoResizeHeight;
