import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Link,
  Route
} from 'react-router-dom'
import Index from './pages';
import SignIn from './pages/signIn';
import User from './pages/user';
import Layout from './components/Layout/Layout';

function App() {

  return (
    <>
      <Router>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route path="/" element={<Index />} />
            <Route path="/user" element={<User />} />
            <Route path="/signin" element={<SignIn />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App