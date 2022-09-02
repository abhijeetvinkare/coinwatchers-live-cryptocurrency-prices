import React, { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {Route, Routes} from 'react-router-dom';
import Home from './components/pages/Home/Home';
import About from './components/pages/About/About';
import Contact from './components/pages/ContactUs/Contact';
import Feedback from './components/pages/Feedback/Feedback'
import News from '../src/components/pages/News/News';
import SignIn from '../src/components/pages/Log In/SignIn';
import SignUp from '../src/components/pages/Log In/SignUp';
import ContactFormResponse from './components/pages/ContactUs/ContactFormResponse';
import UserProfile from '../src/components/pages/Log In/UserProfile';
import SingleCoinDetail from './components/pages/Home/SingleCoinDetails/SingleCoinDetail';
import Watchlist from './components/pages/Watchlist/Watchlist';

function App() {
  return (
    <div>
      <Header />
         <Routes>
           <Route exact path="/" element={<Home />}></Route>
           <Route exact path="/about" element={<About />}></Route>
           <Route exact path="/contact" element={<Contact />}></Route>
           <Route exact path="/feedback" element={<Feedback />}></Route>
           <Route exact path="/news" element={<News />}></Route>
           <Route exact path="/sign-in" element={<SignIn />}></Route>
           <Route exact path="/sign-up" element={<SignUp />}></Route>
           <Route exact path="/contact-response" element={<ContactFormResponse />}></Route>
           <Route exact path="/user-profile" element={<UserProfile />}></Route>
           <Route exact path="/coin/:coinId" element={<SingleCoinDetail />}></Route>
           <Route exact path="/user/watchlist" element={<Watchlist />}></Route>
         </Routes>
          <Footer />
    </div>
  );
}

export default App;
