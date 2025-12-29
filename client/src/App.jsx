import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import EmailVerify from './pages/EmailVerify'
import ResetPassword from './pages/ResetPassword'
import { ToastContainer, toast } from 'react-toastify'
import Profile from './protectedRoutes/Profile';
import ProtectedRoute from './protectedRoutes/ProtectedRoutes';

import 'react-toastify/dist/ReactToastify.css'
import Payment from './pages/Payment'
import PaymentStatus from './pages/Paymentstatus'
const App = () => {
  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000}/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/email-verify' element={<EmailVerify />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/profile' element={
            <ProtectedRoute>
              <Profile/>
            </ProtectedRoute>
          } />
          <Route path="/payment" element={<Payment/>} />
          <Route path="/payment-status" element={<PaymentStatus/>} />

        </Routes>
    </div>
  )
}

export default App
