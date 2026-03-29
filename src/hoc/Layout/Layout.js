import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import classes from './Layout.module.css';
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle';
import Drawer from '../../components/Navigation/Drawer/Drawer';

const Layout = ({ children }) => {
  const [menu, setMenu] = useState(false);
  const isAuthenticated = useSelector(state => !!state.auth?.token);

  const toggleMenuHandler = useCallback(() => {
    setMenu(prevMenu => !prevMenu);
  }, []);

  const menuCloseHandler = useCallback(() => {
    setMenu(false);
  }, []);

  return (
    <div className={classes.Layout}>
      <Drawer
        isOpen={menu}
        onClose={menuCloseHandler}
        isAuthenticated={isAuthenticated}
      />

      <MenuToggle
        onToggle={toggleMenuHandler}
        isOpen={menu}
      />

      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout;