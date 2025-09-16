import React from 'react'

const Schedule = ({ bookings, resources }) => {
  return (
    <div>
      <div className="row mb-4">
        <div className="col">
          <h2 className="fw-bold mb-3">Schedule</h2>
          <p className="text-muted">Weekly calendar view of all bookings</p>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0 py-3">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0 fw-semibold">Weekly Schedule</h5>
                <div className="d-flex gap-2">
                  <button className="btn btn-outline-secondary btn-sm">
                    <i className="bi bi-chevron-left"></i>
                  </button>
                  <button className="btn btn-outline-secondary btn-sm">
                    <i className="bi bi-chevron-right"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Monday</th>
                      <th>Tuesday</th>
                      <th>Wednesday</th>
                      <th>Thursday</th>
                      <th>Friday</th>
                    </tr>
                  </thead>
                  <tbody>
                    {['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM'].map(time => (
                      <tr key={time}>
                        <td className="fw-semibold">{time}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0 py-3">
              <h5 className="card-title mb-0 fw-semibold">Today's Schedule</h5>
            </div>
            <div className="card-body">
              {bookings.length === 0 ? (
                <div className="text-center py-3">
                  <i className="bi bi-calendar-check fs-3 text-muted mb-2"></i>
                  <p className="text-muted mb-0">No bookings for today</p>
                </div>
              ) : (
                <div className="list-group list-group-flush">
                  {bookings.slice(0, 3).map(booking => (
                    <div key={booking.id} className="list-group-item px-0">
                      <div className="d-flex w-100 justify-content-between">
                        <h6 className="mb-1">{booking.resource}</h6>
                        <small>{booking.duration}</small>
                      </div>
                      <p className="mb-1">{booking.name}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Schedule
