import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import WcIcon from "@mui/icons-material/Wc";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import GradingIcon from "@mui/icons-material/Grading";
import CategoryIcon from "@mui/icons-material/Category";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { Link, useLocation } from "react-router-dom";

const items = [
  {
    name: "Home",
    icon: <HomeIcon />,
    to: "/",
  },
  {
    name: "Upload",
    icon: <FileUploadIcon />,
    to: "/upload",
  },
];

function SideBarItems() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      {items.map((item) => (
        <ListItemButton
          key={item.name}
          component={Link}
          to={item.to}
          selected={currentPath === item.to}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.name} />
        </ListItemButton>
      ))}
    </>
  );
}

export default SideBarItems;
