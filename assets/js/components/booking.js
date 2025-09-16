// Booking management component
import { CONFIG } from '../config.js';
import { getTodayDate, isDateInPast, generateId, storage } from '../utils.js';
import { toast } from './toast.js';

export class BookingManager {
    constructor(statsManager, resourceManager) {
        this.statsManager = statsManager;
        this.resourceManager = resourceManager;
        this.bookings = this.loadBookings();
        this.init();
    }

    init() {
        this.bindEvents();
        this.setDefaultDate();
    }

    loadBookings() {
        return storage.get('campusSchedulerBookings', []);
    }

    saveBookings() {
        storage.set('campusSchedulerBookings', this.bookings);
    }

    bindEvents() {
        const form = document.querySelector('.quick-book-form');
        if (form) {
            form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    setDefaultDate() {
        const dateInput = document.getElementById('date');
        if (dateInput) {
            dateInput.value = getTodayDate();
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        
        const bookingData = this.getFormData();
        
        if (!this.validateBooking(bookingData)) {
            return;
        }
        
        this.processBooking(bookingData);
    }

    getFormData() {
        return {
            id: generateId(),
            name: document.getElementById('name')?.value || '',
            resource: document.getElementById('resource')?.value || '',
            date: document.getElementById('date')?.value || '',
            duration: document.getElementById('duration')?.value || '',
            timestamp: new Date().toISOString()
        };
    }

    validateBooking(data) {
        if (!data.name.trim()) {
            toast.error('Please enter your name');
            return false;
        }
        
        if (data.resource === 'Select a resource') {
            toast.error('Please select a resource');
            return false;
        }
        
        if (!data.date) {
            toast.error('Please select a date');
            return false;
        }
        
        if (isDateInPast(data.date)) {
            toast.error('Please select a future date');
            return false;
        }
        
        return true;
    }

    processBooking(bookingData) {
        const submitButton = document.querySelector('.quick-book-form .btn-primary');
        
        // Show loading state
        this.setLoadingState(submitButton, true);
        
        // Simulate API call
        setTimeout(() => {
            // Save booking
            this.bookings.push(bookingData);
            this.saveBookings();
            
            // Update resource status
            const resource = this.resourceManager.getResourceByName(bookingData.resource);
            if (resource) {
                this.resourceManager.updateResourceStatus(resource.id, CONFIG.STATUS.BOOKED);
            }
            
            // Update stats
            this.statsManager.incrementBooking();
            
            // Reset form
            this.resetForm();
            
            // Reset loading state
            this.setLoadingState(submitButton, false);
            
            // Show success message
            toast.success(`Successfully booked ${bookingData.resource} for ${bookingData.date}`);
            
        }, 1500);
    }

    setLoadingState(button, loading) {
        if (!button) return;
        
        if (loading) {
            button.disabled = true;
            button.classList.add('btn-loading');
            button.textContent = 'Booking...';
        } else {
            button.disabled = false;
            button.classList.remove('btn-loading');
            button.textContent = 'Book Resource';
        }
    }

    resetForm() {
        const form = document.querySelector('.quick-book-form');
        if (form) {
            form.reset();
            this.setDefaultDate();
        }
    }

    getBookings() {
        return [...this.bookings];
    }

    getBookingsByUser(userName) {
        return this.bookings.filter(booking => 
            booking.name.toLowerCase() === userName.toLowerCase()
        );
    }

    cancelBooking(bookingId) {
        const bookingIndex = this.bookings.findIndex(b => b.id === bookingId);
        if (bookingIndex > -1) {
            const booking = this.bookings[bookingIndex];
            
            // Remove booking
            this.bookings.splice(bookingIndex, 1);
            this.saveBookings();
            
            // Update resource status back to available
            const resource = this.resourceManager.getResourceByName(booking.resource);
            if (resource) {
                this.resourceManager.updateResourceStatus(resource.id, CONFIG.STATUS.AVAILABLE);
            }
            
            // Update stats
            this.statsManager.decrementBooking();
            
            toast.success(`Booking for ${booking.resource} has been cancelled`);
            
            return true;
        }
        return false;
    }
}
