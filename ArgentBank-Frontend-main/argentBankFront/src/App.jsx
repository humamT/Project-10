import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages';
import SignIn from './pages/signIn';
import User from './pages/user';
import Layout from './components/Layout/Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="user" element={<User />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;