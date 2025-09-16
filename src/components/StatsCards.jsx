import React from 'react'

const StatsCards = ({ resources, bookings }) => {
  const totalResources = resources.length
  const availableNow = resources.filter(r => r.status === 'available').length
  const currentlyBooked = resources.filter(r => r.status === 'booked').length
  const myBookings = bookings.length

  const stats = [
    {
      title: 'Total Resources',
      value: totalResources,
      icon: 'bi-grid-3x3-gap',
      color: 'primary'
    },
    {
      title: 'Available Now',
      value: availableNow,
      icon: 'bi-check-circle',
      color: 'success'
    },
    {
      title: 'Currently Booked',
      value: currentlyBooked,
      icon: 'bi-calendar-check',
      color: 'danger'
    },
    {
      title: 'My Bookings',
      value: myBookings,
      icon: 'bi-calendar-event',
      color: 'primary'
    }
  ]

  return (
    <div className="row g-4 mb-4">
      {stats.map((stat, index) => (
        <div key={index} className="col-lg-3 col-md-6 col-sm-6">
          <div className="card border-0 shadow-sm h-100 stats-card">
            <div className="card-body d-flex align-items-center">
              <div className="flex-grow-1">
                <h6 className="card-subtitle mb-2 text-muted">{stat.title}</h6>
                <h2 className={`card-title mb-0 fw-bold text-${stat.color}`}>{stat.value}</h2>
              </div>
              <div className={`bg-${stat.color} bg-opacity-10 rounded-3 p-3 stats-icon`}>
                <i className={`${stat.icon} text-${stat.color} fs-4`}></i>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default StatsCards
