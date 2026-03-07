import classes from './Drawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

const links = [1, 2, 3];

const Drawer = ({ isOpen, onClose }) => {
  const renderLinks = () => links.map((link, index) => (
    <li key={index}>
      <a href="/">{link}</a>
    </li>
  ));

  const cls = [classes.Drawer];
  
  if (!isOpen) cls.push(classes.close);

  return (
    <>
      <nav className={cls.join(' ')}>
        <ul>{renderLinks()}</ul>
      </nav>
      {isOpen && <Backdrop onClick={onClose} />}
    </>
  );
};

export default Drawer;