"use client";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useState } from "react";

export default function NavMenu({ menuOptions, handleMenuItemClicked }) {
  const [openNav, setOpenNav] = useState(false);

  const handleNavMenuItemClick = (event) => {
    handleMenuItemClicked(event);
    setOpenNav(!openNav);
  };

  const onClose = () => {
    setOpenNav(false);
  };
  return (
    <>
      <Drawer open={openNav} onClose={onClose} anchor="right">
        <List>
          {menuOptions.map((option, index) => (
            <ListItemButton key={index} onClick={handleNavMenuItemClick}>
              <ListItemIcon>
                <ListItemText>{option}</ListItemText>
              </ListItemIcon>
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      <IconButton
        sx={{ marginLeft: "auto" }}
        onClick={() => setOpenNav(!openNav)}
      >
        <MenuIcon />
      </IconButton>
    </>
  );
}
