import React, { useState } from 'react'
import ResourceGrid from './ResourceGrid'

const Resources = ({ resources, setResources }) => {
  const [filter, setFilter] = useState('All Types')

  const filteredResources = filter === 'All Types' 
    ? resources 
    : resources.filter(r => r.type === filter)

  const resourceTypes = [...new Set(resources.map(r => r.type))]

  return (
    <div>
      <div className="row mb-4">
        <div className="col">
          <h2 className="fw-bold mb-3">Resource Management</h2>
          <p className="text-muted">Manage and view all campus resources</p>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white border-0 py-3">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title mb-0 fw-semibold">All Resources</h5>
            <div className="d-flex gap-2">
              <select 
                className="form-select form-select-sm" 
                style={{width: 'auto'}}
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option>All Types</option>
                {resourceTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <button className="btn btn-success btn-sm">
                <i className="bi bi-plus-lg me-1"></i>
                Add Resource
              </button>
            </div>
          </div>
        </div>
        <div className="card-body">
          <ResourceGrid resources={filteredResources} />
        </div>
      </div>
    </div>
  )
}

export default Resources
