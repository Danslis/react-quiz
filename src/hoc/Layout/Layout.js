import Quiz from '../../containers/Quiz/Quiz';
import classes from './Layout.module.css';

const Layout = ({ children }) => {
  return (
    <div className={classes.Layout}>
      <Quiz/>
    </div>
  );
};

export default Layout;