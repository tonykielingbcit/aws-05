import { useState } from 'react'
import Home from "./components/Home.jsx";
import Header from "./components/Header.jsx";
import PageNotFound from "./components/PageNotFound.jsx";
import Footer from "./components/Footer.jsx";
import Login from './components/Login.jsx';
import SignUp from './components/SignUp.jsx';
import Profile from './components/Profile.jsx';
import Logout from './components/Logout.jsx';

import './App.css'
import { HashRouter, Routes, Route } from 'react-router-dom';


function AppRouter() {
  const [count, setCount] = useState(0)

  return (
    <HashRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" exact element = {<Home />} />
          <Route path="/login" exact element = {<Login />} />
          <Route path="/signup" exact element = {<SignUp />} />
          <Route path="/profile" exact element = {<Profile />} />
          <Route path="/logout" exact element = {<Logout />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
      <Footer />
    </HashRouter>
  )
}

export default AppRouter;
