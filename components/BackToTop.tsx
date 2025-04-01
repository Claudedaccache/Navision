import { Fab, Zoom, useScrollTrigger } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const BackToTop = () => {
  const location = useLocation();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 300,
  });

  // Prevent rendering if the path is "/activit%C3%A9"
  if (location.pathname === "/activit%C3%A9") {
    return null;
  }

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Zoom in={trigger}>
      <Fab
        size="small"
        onClick={handleScrollToTop}
        style={{
          position: "fixed",
          bottom: "20%",
          right: "20px",
          color: "#DF2F26",
        }}
      >
        <motion.div
          animate={{ y: [-3, 5, -3] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowUpwardIcon />
        </motion.div>
      </Fab>
    </Zoom>
  );
};

export default BackToTop;
