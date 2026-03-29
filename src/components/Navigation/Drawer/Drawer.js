import React, { useCallback, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Drawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

const Drawer = ({ isOpen, isAuthenticated, onClose }) => {
  const clickHandler = useCallback(() => {
    onClose();
  }, [onClose]);

  const renderLinks = useCallback((links) => {
    return links.map((link, index) => (
      <li key={index}>
        <NavLink
          to={link.to}
          exact={link.exact}
          activeClassName={classes.active}
          onClick={clickHandler}
        >
          {link.label}
        </NavLink>
      </li>
    ));
  }, [clickHandler]); // убран classes.active из зависимостей

  const links = useMemo(() => {
    const baseLinks = [
      { to: '/', label: 'Список', exact: true }
    ];

    if (isAuthenticated) {
      baseLinks.push(
        { to: '/quiz-creator', label: 'Создать тест', exact: false },
        { to: '/logout', label: 'Выйти', exact: false }
      );
    } else {
      baseLinks.push({ to: '/auth', label: 'Авторизация', exact: false });
    }

    return baseLinks;
  }, [isAuthenticated]);

  const drawerClasses = [classes.Drawer];
  if (!isOpen) {
    drawerClasses.push(classes.close);
  }

  return (
    <>
      <nav className={drawerClasses.join(' ')}>
        <ul>
          {renderLinks(links)}
        </ul>
      </nav>
      {isOpen && <Backdrop onClick={onClose} />}
    </>
  );
};

export default Drawer;