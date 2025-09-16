// DOM Elements
const bookButtons = document.querySelectorAll('.book-btn');
const quickBookForm = document.querySelector('.quick-book-form');
const resourceSelect = document.getElementById('resource');
const dateInput = document.getElementById('date');
const filterDropdown = document.querySelector('.filter-dropdown');
const resourceCards = document.querySelectorAll('.resource-card');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    setDefaultDate();
    updateStats();
});

// Event Listeners
function initializeEventListeners() {
    // Book Now buttons on resource cards
    bookButtons.forEach(button => {
        button.addEventListener('click', handleResourceBooking);
    });

    // Quick book form submission
    quickBookForm.addEventListener('submit', handleQuickBooking);

    // Filter dropdown
    filterDropdown.addEventListener('change', handleFilterChange);

    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavigation);
    });

    // Notification icon
    const notificationIcon = document.querySelector('.notification-icon');
    notificationIcon.addEventListener('click', showNotifications);
}

// Set default date to today
function setDefaultDate() {
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
}

// Handle resource booking from cards
function handleResourceBooking(event) {
    const resourceCard = event.target.closest('.resource-card');
    const resourceName = resourceCard.querySelector('.card-title').textContent;
    
    // Pre-fill the quick book form
    resourceSelect.value = resourceName;
    
    // Scroll to quick book form
    document.querySelector('.col-lg-4').scrollIntoView({
        behavior: 'smooth'
    });
    
    // Focus on name input
    document.getElementById('name').focus();
    
    showBootstrapToast(`Selected ${resourceName} for booking`, 'info');
}

// Handle quick booking form submission
function handleQuickBooking(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const bookingData = {
        name: document.getElementById('name').value,
        resource: document.getElementById('resource').value,
        date: document.getElementById('date').value,
        duration: document.getElementById('duration').value
    };
    
    // Validate form
    if (!validateBookingForm(bookingData)) {
        return;
    }
    
    // Simulate booking process
    processBooking(bookingData);
}

// Validate booking form
function validateBookingForm(data) {
    if (!data.name.trim()) {
        showBootstrapToast('Please enter your name', 'error');
        return false;
    }
    
    if (data.resource === 'Select a resource') {
        showBootstrapToast('Please select a resource', 'error');
        return false;
    }
    
    if (!data.date) {
        showBootstrapToast('Please select a date', 'error');
        return false;
    }
    
    // Check if date is in the past
    const selectedDate = new Date(data.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        showBootstrapToast('Please select a future date', 'error');
        return false;
    }
    
    return true;
}

// Process booking
function processBooking(bookingData) {
    // Show loading state
    const submitButton = document.querySelector('.quick-book-form .btn-primary');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Booking...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Clear form
        quickBookForm.reset();
        setDefaultDate();
        
        // Update stats
        updateBookingStats();
        
        // Show success message
        showBootstrapToast(`Successfully booked ${bookingData.resource} for ${bookingData.date}`, 'success');
        
        // Update resource availability (simulate)
        updateResourceAvailability(bookingData.resource);
        
    }, 1500);
}

// Handle filter changes
function handleFilterChange(event) {
    const filterValue = event.target.value;
    
    resourceCards.forEach(card => {
        const resourceType = card.querySelector('.resource-type').textContent.toLowerCase();
        
        if (filterValue === 'All Types' || resourceType.includes(filterValue.toLowerCase())) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
    
    showBootstrapToast(`Filtered by: ${filterValue}`, 'info');
}

// Handle navigation
function handleNavigation(event) {
    event.preventDefault();
    
    // Remove active class from all nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to clicked link
    event.target.classList.add('active');
    
    const page = event.target.textContent;
    showBootstrapToast(`Navigated to ${page}`, 'info');
}

// Show notifications
function showNotifications() {
    showBootstrapToast('No new notifications', 'info');
}

// Update stats after booking
function updateBookingStats() {
    const currentlyBookedElement = document.querySelector('.col-xl-3:nth-child(3) .fw-bold');
    const myBookingsElement = document.querySelector('.col-xl-3:nth-child(4) .fw-bold');
    const availableNowElement = document.querySelector('.col-xl-3:nth-child(2) .fw-bold');
    
    // Increment booked counters
    const currentlyBooked = parseInt(currentlyBookedElement.textContent) + 1;
    const myBookings = parseInt(myBookingsElement.textContent) + 1;
    const availableNow = parseInt(availableNowElement.textContent) - 1;
    
    currentlyBookedElement.textContent = currentlyBooked;
    myBookingsElement.textContent = myBookings;
    availableNowElement.textContent = Math.max(0, availableNow);
}

// Update resource availability
function updateResourceAvailability(resourceName) {
    const resourceCards = document.querySelectorAll('.resource-card');
    
    resourceCards.forEach(card => {
        const cardTitle = card.querySelector('.card-title').textContent;
        if (cardTitle === resourceName) {
            const statusBadge = card.querySelector('.badge');
            const bookButton = card.querySelector('.book-btn');
            
            statusBadge.textContent = 'Booked';
            statusBadge.classList.remove('bg-success');
            statusBadge.classList.add('bg-danger');
            
            bookButton.textContent = 'Unavailable';
            bookButton.disabled = true;
            bookButton.classList.add('disabled');
        }
    });
}

// Update general stats
function updateStats() {
    // This would typically fetch real data from an API
    // For now, we'll just ensure the display is correct
    const stats = {
        totalResources: 4,
        availableNow: 4,
        currentlyBooked: 0,
        myBookings: 0
    };
    
    // Update display if needed
    document.querySelector('.col-xl-3:nth-child(1) .fw-bold').textContent = stats.totalResources;
    document.querySelector('.col-xl-3:nth-child(2) .fw-bold').textContent = stats.availableNow;
    document.querySelector('.col-xl-3:nth-child(3) .fw-bold').textContent = stats.currentlyBooked;
    document.querySelector('.col-xl-3:nth-child(4) .fw-bold').textContent = stats.myBookings;
}

// Bootstrap Toast notification system
function showBootstrapToast(message, type = 'info') {
    // Remove existing toast container
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container position-fixed top-0 end-0 p-3';
        toastContainer.style.zIndex = '1055';
        document.body.appendChild(toastContainer);
    }
    
    // Create Bootstrap toast
    const toastElement = document.createElement('div');
    toastElement.className = 'toast';
    toastElement.setAttribute('role', 'alert');
    
    // Set toast color based on type
    const typeClasses = {
        success: 'text-bg-success',
        error: 'text-bg-danger',
        info: 'text-bg-primary',
        warning: 'text-bg-warning'
    };
    
    toastElement.classList.add(typeClasses[type] || typeClasses.info);
    
    toastElement.innerHTML = `
        <div class="toast-header">
            <i class="bi bi-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-triangle' : 'info-circle'} me-2"></i>
            <strong class="me-auto">${type.charAt(0).toUpperCase() + type.slice(1)}</strong>
            <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
        </div>
        <div class="toast-body">
            ${message}
        </div>
    `;
    
    toastContainer.appendChild(toastElement);
    
    // Initialize and show Bootstrap toast
    const toast = new bootstrap.Toast(toastElement, {
        autohide: true,
        delay: 3000
    });
    
    toast.show();
    
    // Remove from DOM after hiding
    toastElement.addEventListener('hidden.bs.toast', () => {
        toastElement.remove();
    });
}

// Utility function to format dates
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Simulate real-time updates (optional)
function startRealTimeUpdates() {
    // This could be used to periodically update resource availability
    // setInterval(updateStats, 30000); // Update every 30 seconds
}
