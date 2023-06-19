import AddCircleIcon from "@mui/icons-material/AddCircle";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, List, ListItem, ListSubheader, Tab } from "@mui/material";
import { useState } from "react";
import Add from "./Add";
import Rename from "./Rename";

export default function Manipulate() {
  const [mode, setMode] = useState("add");

  const handleChange = (_, value) => {
    setMode(value);
  };

  return (
    <Box sx={{ my: 1, ml: 1, display: "flex", flexDirection: "column" }}>
      <List
        sx={{
          mt: 1,
          width: "90%",
          bgcolor: "background.paper",
        }}
        component="nav"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            操作系統
          </ListSubheader>
        }
      >
        <ListItem style={{ paddingTop: 0 }}>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={mode}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="新增選項" value="add" icon={<AddCircleIcon />} />
                  <Tab
                    label="重新命名"
                    value="rename"
                    icon={<DriveFileRenameOutlineIcon />}
                  />
                </TabList>
              </Box>
              <TabPanel
                value="add"
                style={{ paddingLeft: 0, paddingBottom: 0 }}
              >
                <Add />
              </TabPanel>
              <TabPanel
                value="rename"
                style={{ paddingLeft: 0, paddingBottom: 0 }}
              >
                <Rename />
              </TabPanel>
            </TabContext>
          </Box>
        </ListItem>
      </List>
    </Box>
  );
}
