// Stats management component
import { storage } from '../utils.js';
import { DEFAULT_RESOURCES } from '../config.js';

export class StatsManager {
    constructor() {
        this.resources = DEFAULT_RESOURCES;
        this.stats = this.calculateStats();
        this.elements = {};
        this.init();
    }

    init() {
        this.cacheElements();
        this.renderStatsCards();
        this.render();
    }

    cacheElements() {
        this.elements = {
            totalResources: document.querySelector('.col-xl-3:nth-child(1) .fw-bold'),
            availableNow: document.querySelector('.col-xl-3:nth-child(2) .fw-bold'),
            currentlyBooked: document.querySelector('.col-xl-3:nth-child(3) .fw-bold'),
            myBookings: document.querySelector('.col-xl-3:nth-child(4) .fw-bold'),
            statsContainer: document.querySelector('.row.g-3.mb-4')
        };
    }

    calculateStats() {
        const totalResources = this.resources.length;
        const availableNow = this.resources.filter(r => r.status === 'available').length;
        const currentlyBooked = this.resources.filter(r => r.status === 'booked').length;
        const myBookings = storage.get('campusSchedulerBookings', []).length;

        return {
            totalResources,
            availableNow,
            currentlyBooked,
            myBookings
        };
    }

    renderStatsCards() {
        if (!this.elements.statsContainer) return;

        // Get resource type counts
        const typeCounts = this.getResourceTypeCounts();
        
        this.elements.statsContainer.innerHTML = `
            ${Object.entries(typeCounts).map(([type, count]) => `
                <div class="col-md-3">
                    <div class="card border-0 shadow-sm">
                        <div class="card-body text-center">
                            <i class="bi ${this.getTypeIcon(type)} fs-1 text-primary mb-3"></i>
                            <h5>${type}</h5>
                            <p class="text-muted mb-0">${count} Available</p>
                        </div>
                    </div>
                </div>
            `).join('')}
        `;
    }

    getResourceTypeCounts() {
        const counts = {};
        this.resources.forEach(resource => {
            const availableCount = this.resources.filter(r => 
                r.type === resource.type && r.status === 'available'
            ).length;
            counts[resource.type] = availableCount;
        });
        return counts;
    }

    getTypeIcon(type) {
        const icons = {
            'Lab': 'bi-pc-display',
            'Classroom': 'bi-building',
            'Auditorium': 'bi-megaphone',
            'Conference Room': 'bi-people'
        };
        return icons[type] || 'bi-building';
    }

    saveStats() {
        storage.set('campusSchedulerStats', this.stats);
    }

    updateStats(updates) {
        Object.assign(this.stats, updates);
        this.saveStats();
        this.render();
    }

    incrementBooking() {
        this.updateStats({
            currentlyBooked: this.stats.currentlyBooked + 1,
            myBookings: this.stats.myBookings + 1,
            availableNow: Math.max(0, this.stats.availableNow - 1)
        });
    }

    decrementBooking() {
        this.updateStats({
            currentlyBooked: Math.max(0, this.stats.currentlyBooked - 1),
            myBookings: Math.max(0, this.stats.myBookings - 1),
            availableNow: Math.min(this.stats.totalResources, this.stats.availableNow + 1)
        });
    }

    render() {
        if (this.elements.totalResources) {
            this.elements.totalResources.textContent = this.stats.totalResources;
        }
        if (this.elements.availableNow) {
            this.elements.availableNow.textContent = this.stats.availableNow;
        }
        if (this.elements.currentlyBooked) {
            this.elements.currentlyBooked.textContent = this.stats.currentlyBooked;
        }
        if (this.elements.myBookings) {
            this.elements.myBookings.textContent = this.stats.myBookings;
        }
    }

    getStats() {
        return { ...this.stats };
    }
}
