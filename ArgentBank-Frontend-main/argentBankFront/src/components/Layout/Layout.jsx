import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/header';
import './Layout.css';

function Layout() {
  return (
    <div className="Layout">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;