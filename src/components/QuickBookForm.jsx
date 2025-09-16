import React, { useState } from 'react'

const QuickBookForm = ({ resources, onBooking }) => {
  const [formData, setFormData] = useState({
    name: '',
    resource: '',
    date: new Date().toISOString().split('T')[0],
    duration: '1 hour'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.resource || formData.resource === 'Select a resource') {
      alert('Please fill in all fields')
      return
    }
    onBooking(formData)
    setFormData({
      name: '',
      resource: '',
      date: new Date().toISOString().split('T')[0],
      duration: '1 hour'
    })
    alert(`Successfully booked ${formData.resource}!`)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="card border-0 shadow-sm quick-book-card">
      <div className="card-header bg-white border-0 py-3">
        <h5 className="card-title mb-0 fw-semibold">Quick Book Resource</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Your Name</label>
            <input 
              type="text" 
              className="form-control" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="resource" className="form-label">Resource</label>
            <select 
              className="form-select" 
              name="resource"
              value={formData.resource}
              onChange={handleChange}
            >
              <option>Select a resource</option>
              {resources.filter(r => r.status === 'available').map(resource => (
                <option key={resource.id} value={resource.name}>{resource.name}</option>
              ))}
            </select>
          </div>
          <div className="row g-2 mb-3">
            <div className="col-6">
              <label htmlFor="date" className="form-label">Date</label>
              <input 
                type="date" 
                className="form-control" 
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>
            <div className="col-6">
              <label htmlFor="duration" className="form-label">Duration</label>
              <select 
                className="form-select" 
                name="duration"
                value={formData.duration}
                onChange={handleChange}
              >
                <option>1 hour</option>
                <option>2 hours</option>
                <option>3 hours</option>
                <option>4 hours</option>
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100">Book Resource</button>
        </form>
      </div>
    </div>
  )
}

export default QuickBookForm
