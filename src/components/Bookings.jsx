import React from 'react'

const Bookings = ({ bookings, setBookings }) => {
  const handleCancelBooking = (bookingId) => {
    setBookings(bookings.filter(b => b.id !== bookingId))
  }

  return (
    <div>
      <div className="row mb-4">
        <div className="col">
          <h2 className="fw-bold mb-3">My Bookings</h2>
          <p className="text-muted">View and manage your resource bookings</p>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white border-0 py-3">
          <h5 className="card-title mb-0 fw-semibold">Booking History</h5>
        </div>
        <div className="card-body">
          {bookings.length === 0 ? (
            <div className="text-center py-4">
              <i className="bi bi-calendar-x fs-1 text-muted mb-3"></i>
              <h5 className="text-muted">No bookings yet</h5>
              <p className="text-muted">Start by booking a resource from the dashboard</p>
            </div>
          ) : (
            <div className="row g-3">
              {bookings.map(booking => (
                <div key={booking.id} className="col-12">
                  <div className="card border">
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col-md-8">
                          <h6 className="card-title mb-1">{booking.resource}</h6>
                          <p className="card-text text-muted mb-1">
                            <i className="bi bi-person me-2"></i>{booking.name}
                          </p>
                          <p className="card-text text-muted mb-0">
                            <i className="bi bi-calendar me-2"></i>{booking.date} • {booking.duration}
                          </p>
                        </div>
                        <div className="col-md-4 text-end">
                          <span className="badge bg-success me-2">Confirmed</span>
                          <button 
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleCancelBooking(booking.id)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Bookings
