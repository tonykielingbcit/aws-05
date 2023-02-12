import { useState } from "react";
import Home from "./Home.jsx";
import Header from "./Header.jsx";
import PageNotFound from "./PageNotFound.jsx";
import Footer from "./Footer.jsx";
import Login from "./Login.jsx";
import SignUp from "./SignUp.jsx";
import Profile from "./Profile.jsx";
import Logout from "./Logout.jsx";

import "../styles/App.css";
import { HashRouter, Routes, Route } from "react-router-dom";

export default function AppRouter() {
  return (
    <HashRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<SignUp />} />
          <Route path="/profile" exact element={<Profile />} />
          <Route path="/logout" exact element={<Logout />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
      <Footer />
    </HashRouter>
  );
}
