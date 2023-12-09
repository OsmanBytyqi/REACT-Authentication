import React from 'react';
import SignInSide from './components/SignInSide';
import SignUp from './components/SignUp';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Header from './components/header/Header';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import PrivateRoutes from './guard/Auth';
import BlogDetails from './components/BlogDetails';
import CreateBlog from './components/CreateBlog';
function App() {

  return (
    <div className='App'>
      <ToastContainer theme='colored' position='top-right'></ToastContainer>
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />} >
            <Route path='/dashboard' element={<Dashboard />} />
          </Route>
          <Route path='/' element={<SignInSide />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/createblog' element={<CreateBlog />} />
          <Route path='/home' element={<Home />}></Route>
          <Route path="/blogs/:id" element={<BlogDetails/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;