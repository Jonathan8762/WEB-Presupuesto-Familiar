import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArticleIcon from '@mui/icons-material/Article';
import Inventory2Icon from '@mui/icons-material/Inventory2';

interface MenuLateralProps {
  open: boolean;
  toggleDrawer: () => void;
}

const MenuLateral: React.FC<MenuLateralProps> = ({ open, toggleDrawer }) => {
  return (
    <Drawer anchor="left" open={open} onClose={toggleDrawer}>
      <List>
        <ListItem button component={Link} to="/Plan">
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="Plan" />
        </ListItem>
        <ListItem button component={Link} to="/Ingresos">
          <ListItemIcon>< Inventory2Icon /></ListItemIcon>
          <ListItemText primary="Ingresos" />
        </ListItem>
        <ListItem button component={Link} to="/Gastos">
          <ListItemIcon><ArticleIcon /></ListItemIcon>
          <ListItemText primary="Gastos" />
        </ListItem>
        <ListItem button component={Link} to="/Miembros">
          <ListItemIcon><AddCircleIcon /></ListItemIcon>
          <ListItemText primary="Miembros" />
        </ListItem>

      </List>
    </Drawer>
  );
};

export default MenuLateral;