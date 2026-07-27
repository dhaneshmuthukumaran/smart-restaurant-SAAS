import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from '../pages/Home'
import RestaurantDetailsPage from '../pages/RestaurantDetails'
import ProfilePage from '../pages/Profile'
import BookingPage from '../pages/Bookings'

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/restaurants/:id" element={<RestaurantDetailsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/bookings" element={<BookingPage />} />
      </Routes>
    </Router>
  )
}

export default AppRoutes
