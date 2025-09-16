import React from 'react'

const Navbar = ({ currentPage, setCurrentPage }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'bi-speedometer2' },
    { id: 'resources', label: 'Resources', icon: 'bi-building' },
    { id: 'bookings', label: 'My Bookings', icon: 'bi-calendar-check' },
    { id: 'schedule', label: 'Schedule', icon: 'bi-calendar-week' }
  ]

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container-fluid">
        <a className="navbar-brand fw-bold" href="#">
          <i className="bi bi-calendar-event me-2"></i>
          Campus Scheduler
        </a>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            {navItems.map(item => (
              <li className="nav-item" key={item.id}>
                <button
                  className={`nav-link btn btn-link text-white ${currentPage === item.id ? 'active' : ''}`}
                  onClick={() => setCurrentPage(item.id)}
                >
                  <i className={`${item.icon} me-1`}></i>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
          
          <div className="d-flex align-items-center">
            <button className="btn btn-outline-light me-2">
              <i className="bi bi-bell"></i>
            </button>
            <div className="dropdown">
              <button className="btn btn-outline-light dropdown-toggle" type="button" data-bs-toggle="dropdown">
                <i className="bi bi-person-circle me-1"></i>
                Admin
              </button>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Profile</a></li>
                <li><a className="dropdown-item" href="#">Settings</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Logout</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
