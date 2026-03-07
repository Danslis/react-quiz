import React, { useState } from 'react';
import classes from './Layout.module.css';
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle';
import Drawer from '../../components/Navigation/Drawer/Drawer';

const Layout = ({ children }) => {
  const [menu, setMenu] = useState(false);

  const toggleMenuHandler = () => {
    setMenu(!menu);
  };

  return (
    <div className={classes.Layout}>
      <Drawer isOpen={menu} />

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