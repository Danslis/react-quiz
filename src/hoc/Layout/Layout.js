import { useState } from 'react';
import classes from './Layout.module.css';
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle';
import Drawer from '../../components/Navigation/Drawer/Drawer';

const Layout = ({ children }) => {
  const [menu, setMenu] = useState(false);

  const toggleMenuHandler = () => setMenu(prev => !prev);
  
  const menuCloseHandler = () => setMenu(false);

  return (
    <div className={classes.Layout}>     
      <Drawer isOpen={menu} onClose={menuCloseHandler} />     
      <MenuToggle onToggle={toggleMenuHandler} isOpen={menu} />    
      <main>{children}</main>
    </div>
  );
};

export default Layout;