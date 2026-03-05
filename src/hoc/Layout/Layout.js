import classes from './Layout.module.css';

const Layout = ({ children }) => {
  return (
    <div className={classes.Layout}>
      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout;