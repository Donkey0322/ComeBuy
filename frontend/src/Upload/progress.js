import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Box, Typography, LinearProgress, Stack, Button } from "@mui/material";

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

function HelperText({ color, children }) {
  return (
    <Typography color={color} variant="caption">
      {children}
    </Typography>
  );
}

HelperText.propTypes = {
  color: PropTypes.string,
  children: PropTypes.node.isRequired,
};

HelperText.defaultProps = {
  color: "default",
};

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

const Progress = ({ file }) => {
  const [progress, setProgress] = React.useState(0);

  useEffect(() => {
    if (file) {
      const timer = setInterval(() => {
        if (progress < 100) {
          setProgress((prevProgress) =>
            prevProgress >= 100 ? 100 : prevProgress + 10
          );
        }
      }, 100);
      return () => {
        clearInterval(timer);
      };
    }
  }, [file]);

  return (
    <Box sx={{ width: "100%" }}>
      <HelperText color="default" children={file.name} />
      <LinearProgressWithLabel value={progress} />
    </Box>
  );
};

export default Progress;
