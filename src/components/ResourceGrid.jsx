import React from 'react'
import { FEATURE_ICONS } from '../config/resources'

const ResourceGrid = ({ resources }) => {
  return (
    <div className="row g-3">
      {resources.map(resource => (
        <div key={resource.id} className="col-md-6">
          <div className="card resource-card border" data-resource-id={resource.id}>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <h6 className="card-title mb-0 fw-semibold">{resource.name}</h6>
                <span className={`badge ${resource.status === 'available' ? 'bg-success' : 'bg-danger'} resource-badge`}>
                  {resource.status === 'available' ? 'Available' : 'Booked'}
                </span>
              </div>
              <p className="card-text text-muted small mb-3">
                {resource.type} • Capacity: {resource.capacity}
              </p>
              <div className="resource-features mb-3">
                <small className="text-muted resource-feature">
                  <i className="bi bi-people me-1"></i>{resource.capacity}
                </small>
                {resource.features.map(feature => (
                  <small key={feature} className="text-muted resource-feature ms-2">
                    <i className={`${FEATURE_ICONS[feature] || 'bi-gear'} me-1`}></i>{feature}
                  </small>
                ))}
              </div>
              <button 
                className={`btn btn-outline-primary btn-sm w-100 book-btn ${resource.status !== 'available' ? 'disabled' : ''}`}
                data-resource-name={resource.name}
                disabled={resource.status !== 'available'}
              >
                {resource.status === 'available' ? 'Book Now' : 'Unavailable'}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ResourceGrid
