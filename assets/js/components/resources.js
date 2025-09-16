// Resource management component
import { CONFIG, DEFAULT_RESOURCES, FEATURE_ICONS } from '../config.js';
import { storage, sanitizeHTML } from '../utils.js';
import { toast } from './toast.js';

export class ResourceManager {
    constructor() {
        this.resources = this.loadResources();
        this.filteredResources = [...this.resources];
        this.currentFilter = 'All Types';
        this.init();
    }

    init() {
        this.render();
        this.bindEvents();
    }

    loadResources() {
        return storage.get('campusSchedulerResources', DEFAULT_RESOURCES);
    }

    saveResources() {
        storage.set('campusSchedulerResources', this.resources);
    }

    filterResources(type) {
        this.currentFilter = type;
        if (type === 'All Types') {
            this.filteredResources = [...this.resources];
        } else {
            this.filteredResources = this.resources.filter(resource => 
                resource.type.toLowerCase().includes(type.toLowerCase())
            );
        }
        this.render();
        toast.info(`Filtered by: ${type}`);
    }

    updateResourceStatus(resourceId, status) {
        const resource = this.resources.find(r => r.id === resourceId);
        if (resource) {
            resource.status = status;
            this.saveResources();
            this.render();
        }
    }

    getResourceByName(name) {
        return this.resources.find(resource => resource.name === name);
    }

    render() {
        const container = document.querySelector('.resources-container');
        if (!container) return;

        container.innerHTML = this.filteredResources.map(resource => 
            this.createResourceCard(resource)
        ).join('');

        this.bindResourceEvents();
    }

    createResourceCard(resource) {
        const statusClass = resource.status === 'available' ? 'bg-success' : 'bg-danger';
        const statusText = resource.status === 'available' ? 'Available' : 'Booked';
        const buttonDisabled = resource.status !== 'available' ? 'disabled' : '';
        const buttonText = resource.status === 'available' ? 'Book Now' : 'Unavailable';

        const features = resource.features.map(feature => {
            const icon = FEATURE_ICONS[feature] || 'bi-gear';
            return `<small class="text-muted resource-feature">
                <i class="${icon} me-1"></i>${feature}
            </small>`;
        }).join('');

        return `
            <div class="col-md-6">
                <div class="card resource-card border" data-resource-id="${resource.id}">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <h6 class="card-title mb-0 fw-semibold">${sanitizeHTML(resource.name)}</h6>
                            <span class="badge ${statusClass} resource-badge">${statusText}</span>
                        </div>
                        <p class="card-text text-muted small mb-3">
                            ${sanitizeHTML(resource.type)} • Capacity: ${resource.capacity}
                        </p>
                        <div class="resource-features mb-3">
                            <small class="text-muted resource-feature">
                                <i class="bi bi-people me-1"></i>${resource.capacity}
                            </small>
                            ${features}
                        </div>
                        <button class="btn btn-outline-primary btn-sm w-100 book-btn" 
                                data-resource-name="${sanitizeHTML(resource.name)}" 
                                ${buttonDisabled}>
                            ${buttonText}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    bindEvents() {
        const filterDropdown = document.querySelector('.filter-dropdown');
        if (filterDropdown) {
            filterDropdown.addEventListener('change', (e) => {
                this.filterResources(e.target.value);
            });
        }
    }

    bindResourceEvents() {
        const bookButtons = document.querySelectorAll('.book-btn:not([disabled])');
        bookButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const resourceName = e.target.dataset.resourceName;
                this.handleResourceBooking(resourceName);
            });
        });
    }

    handleResourceBooking(resourceName) {
        // Pre-fill the quick book form
        const resourceSelect = document.getElementById('resource');
        if (resourceSelect) {
            resourceSelect.value = resourceName;
        }

        // Scroll to quick book form
        const quickBookSection = document.querySelector('.col-lg-4');
        if (quickBookSection) {
            quickBookSection.scrollIntoView({ behavior: 'smooth' });
        }

        // Focus on name input
        const nameInput = document.getElementById('name');
        if (nameInput) {
            setTimeout(() => nameInput.focus(), 300);
        }

        toast.info(`Selected ${resourceName} for booking`);
    }
}
