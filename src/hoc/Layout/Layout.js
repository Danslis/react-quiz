import './Layout.css';

const Layout = ({ children, className = '' }) => {
  return (
    <div className={`Layout ${className}`.trim()}>
      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout;