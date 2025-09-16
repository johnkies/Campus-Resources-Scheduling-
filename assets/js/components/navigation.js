// Navigation component
import { toast } from './toast.js';

export class NavigationManager {
    constructor() {
        this.currentPage = 'Dashboard';
        this.pages = {
            'Dashboard': 'dashboard-page',
            'Resources': 'resources-page',
            'My Bookings': 'my-bookings-page',
            'Schedule': 'schedule-page'
        };
        this.init();
    }

    init() {
        this.bindEvents();
        this.showPage('Dashboard'); // Show dashboard by default
    }

    bindEvents() {
        // Navigation links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavigation(e));
        });

        // Notification button
        const notificationBtn = document.querySelector('.notification-btn');
        if (notificationBtn) {
            notificationBtn.addEventListener('click', () => this.showNotifications());
        }
    }

    handleNavigation(event) {
        event.preventDefault();
        
        const pageName = event.target.textContent.trim();
        
        // Don't navigate if already on the same page
        if (pageName === this.currentPage) {
            return;
        }

        this.showPage(pageName);
        toast.info(`Navigated to ${pageName}`);
    }

    showPage(pageName) {
        // Hide all pages
        document.querySelectorAll('.page-content').forEach(page => {
            page.classList.add('d-none');
        });

        // Show selected page
        const pageId = this.pages[pageName];
        if (pageId) {
            const pageElement = document.getElementById(pageId);
            if (pageElement) {
                pageElement.classList.remove('d-none');
                this.currentPage = pageName;
                this.setActivePage(pageName);
                
                // Trigger page-specific initialization
                this.initializePage(pageName);
            }
        }
    }

    initializePage(pageName) {
        switch (pageName) {
            case 'Resources':
                this.initializeResourcesPage();
                break;
            case 'My Bookings':
                this.initializeMyBookingsPage();
                break;
            case 'Schedule':
                this.initializeSchedulePage();
                break;
        }
    }

    initializeResourcesPage() {
        // Initialize resources page specific functionality
        const allResourcesContainer = document.querySelector('.all-resources-container');
        if (allResourcesContainer && window.CampusScheduler) {
            const resourceManager = window.CampusScheduler.getComponent('resources');
            if (resourceManager) {
                // Render all resources in the resources page
                allResourcesContainer.innerHTML = resourceManager.filteredResources.map(resource => 
                    resourceManager.createResourceCard(resource)
                ).join('');
                resourceManager.bindResourceEvents();
            }
        }
    }

    initializeMyBookingsPage() {
        // Initialize my bookings page
        const bookingsContainer = document.getElementById('bookings-list');
        if (bookingsContainer && window.CampusScheduler) {
            const bookingManager = window.CampusScheduler.getComponent('booking');
            if (bookingManager) {
                this.renderBookings(bookingManager.getBookings());
                this.updateBookingCounts(bookingManager.getBookings());
            }
        }
    }

    initializeSchedulePage() {
        // Initialize schedule page
        this.renderWeeklySchedule();
        this.renderTodaySchedule();
    }

    renderBookings(bookings) {
        const bookingsContainer = document.getElementById('bookings-list');
        if (!bookingsContainer) return;

        if (bookings.length === 0) {
            bookingsContainer.innerHTML = `
                <div class="text-center py-5">
                    <i class="bi bi-calendar-x fs-1 text-muted mb-3"></i>
                    <h5 class="text-muted">No bookings found</h5>
                    <p class="text-muted">You haven't made any bookings yet.</p>
                    <button class="btn btn-primary" onclick="window.CampusScheduler.getComponent('navigation').showPage('Dashboard')">
                        Make a Booking
                    </button>
                </div>
            `;
            return;
        }

        bookingsContainer.innerHTML = bookings.map(booking => `
            <div class="card mb-3 border-start border-primary border-4">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-md-8">
                            <h6 class="card-title mb-1">${booking.resource}</h6>
                            <p class="card-text text-muted mb-1">
                                <i class="bi bi-person me-2"></i>${booking.name}
                            </p>
                            <p class="card-text text-muted mb-0">
                                <i class="bi bi-calendar me-2"></i>${new Date(booking.date).toLocaleDateString()}
                                <i class="bi bi-clock ms-3 me-2"></i>${booking.duration}
                            </p>
                        </div>
                        <div class="col-md-4 text-end">
                            <span class="badge bg-success mb-2">Active</span><br>
                            <button class="btn btn-outline-danger btn-sm" onclick="window.CampusScheduler.getComponent('booking').cancelBooking('${booking.id}')">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    updateBookingCounts(bookings) {
        const activeCount = bookings.length;
        const upcomingCount = bookings.filter(b => new Date(b.date) > new Date()).length;
        const completedCount = bookings.filter(b => new Date(b.date) < new Date()).length;

        document.getElementById('active-bookings-count').textContent = activeCount;
        document.getElementById('upcoming-bookings-count').textContent = upcomingCount;
        document.getElementById('completed-bookings-count').textContent = completedCount;
    }

    renderWeeklySchedule() {
        const scheduleContainer = document.getElementById('schedule-calendar');
        if (!scheduleContainer) return;

        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const hours = ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

        let scheduleHTML = `
            <div class="table-responsive">
                <table class="table table-bordered">
                    <thead class="table-light">
                        <tr>
                            <th style="width: 100px;">Time</th>
                            ${days.map(day => `<th class="text-center">${day}</th>`).join('')}
                        </tr>
                    </thead>
                    <tbody>
        `;

        hours.forEach(hour => {
            scheduleHTML += `<tr><td class="fw-semibold">${hour}</td>`;
            days.forEach(day => {
                scheduleHTML += `<td class="schedule-cell" style="height: 50px; cursor: pointer;" data-day="${day}" data-hour="${hour}"></td>`;
            });
            scheduleHTML += '</tr>';
        });

        scheduleHTML += `
                    </tbody>
                </table>
            </div>
        `;

        scheduleContainer.innerHTML = scheduleHTML;

        // Add click handlers for schedule cells
        document.querySelectorAll('.schedule-cell').forEach(cell => {
            cell.addEventListener('click', (e) => {
                const day = e.target.dataset.day;
                const hour = e.target.dataset.hour;
                toast.info(`Selected ${day} at ${hour}`);
            });
        });
    }

    renderTodaySchedule() {
        const todayContainer = document.getElementById('today-schedule');
        if (!todayContainer) return;

        todayContainer.innerHTML = `
            <div class="text-center py-4">
                <i class="bi bi-calendar-day fs-1 text-muted mb-3"></i>
                <h6 class="text-muted">No bookings today</h6>
                <p class="text-muted small">Your schedule is clear for today.</p>
            </div>
        `;
    }

    showNotifications() {
        toast.info('No new notifications');
    }

    setActivePage(pageName) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.textContent.trim() === pageName) {
                link.classList.add('active');
            }
        });
    }

    getCurrentPage() {
        return this.currentPage;
    }
}
