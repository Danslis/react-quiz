import React from 'react';
import classes from './Drawer.module.css';

const links = [1, 2, 3];

const Drawer = ({ isOpen }) => {
  const renderLinks = () => {
    return links.map((link, index) => (
      <li key={index}>
        <a href="/">{link}</a>
      </li>
    ));
  };

  const cls = [classes.Drawer];

  if (!isOpen) {
    cls.push(classes.close);
  }

  return (
    <nav className={cls.join(' ')}>
      <ul>
        {renderLinks()}
      </ul>
    </nav>
  );
};

export default Drawer;