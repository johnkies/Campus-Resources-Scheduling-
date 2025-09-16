import React from 'react'
import StatsCards from './StatsCards'
import ResourceGrid from './ResourceGrid'
import QuickBookForm from './QuickBookForm'

const Dashboard = ({ resources, bookings, onBooking }) => {
  return (
    <div>
      <StatsCards resources={resources} bookings={bookings} />
      
      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center py-3">
              <h5 className="card-title mb-0 fw-semibold">Available Resources</h5>
              <div className="d-flex gap-2">
                <select className="form-select form-select-sm" style={{width: 'auto'}}>
                  <option>All Types</option>
                  <option>Laboratory</option>
                </select>
                <button className="btn btn-primary btn-sm">
                  <i className="bi bi-plus-lg me-1"></i>
                  Book Resource
                </button>
              </div>
            </div>
            <div className="card-body">
              <ResourceGrid resources={resources} />
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <QuickBookForm resources={resources} onBooking={onBooking} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
