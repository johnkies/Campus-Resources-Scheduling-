import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import Resources from './components/Resources'
import Bookings from './components/Bookings'
import Schedule from './components/Schedule'
import { DEFAULT_RESOURCES } from './config/resources'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [resources, setResources] = useState(DEFAULT_RESOURCES)
  const [bookings, setBookings] = useState([])

  const handleBooking = (bookingData) => {
    const newBooking = {
      id: Date.now(),
      ...bookingData,
      date: new Date().toISOString()
    }
    setBookings([...bookings, newBooking])
    
    // Update resource status
    setResources(resources.map(resource => 
      resource.name === bookingData.resource 
        ? { ...resource, status: 'booked' }
        : resource
    ))
  }

  const renderPage = () => {
    switch(currentPage) {
      case 'dashboard':
        return <Dashboard resources={resources} bookings={bookings} onBooking={handleBooking} />
      case 'resources':
        return <Resources resources={resources} setResources={setResources} />
      case 'bookings':
        return <Bookings bookings={bookings} setBookings={setBookings} />
      case 'schedule':
        return <Schedule bookings={bookings} resources={resources} />
      default:
        return <Dashboard resources={resources} bookings={bookings} onBooking={handleBooking} />
    }
  }

  return (
    <div className="App">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="container-fluid py-4">
        {renderPage()}
      </div>
    </div>
  )
}

export default App
