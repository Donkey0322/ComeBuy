import HandymanIcon from "@mui/icons-material/Handyman";
import HomeIcon from "@mui/icons-material/Home";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link, useLocation } from "react-router-dom";

const items = [
  {
    name: "首頁",
    icon: <HomeIcon />,
    to: "/",
  },
  {
    name: "系統操作",
    icon: <HandymanIcon />,
    to: "/manipulate",
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
