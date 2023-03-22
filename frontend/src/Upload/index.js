import React, { useState } from "react";
import { Stack, Button } from "@mui/material";
import Progress from "./progress";

const Upload = () => {
  const [files, setFiles] = useState([]);
  const handleChange = (e) => {
    const {
      target: { files },
    } = e;

    console.log(Object.values(files));
    setFiles((prev) => [
      ...prev,
      ...Object.values(files).filter(
        (f) =>
          !Boolean(prev.find((p) => p.name === f.name && p.size === f.size))
      ),
    ]);
  };

  return (
    <Stack
      // direction="column"
      // alignItems="center"
      spacing={2}
      sx={{ mt: 1, ml: 1, mr: 1 }}
    >
      <Button
        sx={{ width: "10%", maxWidth: "80px" }}
        variant="contained"
        component="label"
      >
        Upload
        <input
          hidden
          multiple
          type="file"
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          onChange={handleChange}
        />
      </Button>
      {files.map((m, index) => (
        <Progress file={m} key={index} />
      ))}
    </Stack>
  );
};

export default Upload;
