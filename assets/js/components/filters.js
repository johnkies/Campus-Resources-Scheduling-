// Dynamic filter management component
import { DEFAULT_RESOURCES, CONFIG } from '../config.js';

export class FilterManager {
    constructor() {
        this.resources = DEFAULT_RESOURCES;
        this.init();
    }

    init() {
        this.renderFilterDropdowns();
        this.renderResourceDropdown();
    }

    renderFilterDropdowns() {
        // Update all filter dropdowns
        const filterDropdowns = document.querySelectorAll('.filter-dropdown, .resources-filter');
        
        filterDropdowns.forEach(dropdown => {
            const uniqueTypes = this.getUniqueResourceTypes();
            dropdown.innerHTML = `
                <option>All Types</option>
                ${uniqueTypes.map(type => `<option>${type}</option>`).join('')}
            `;
        });
    }

    renderResourceDropdown() {
        // Update booking form resource dropdown
        const resourceDropdown = document.getElementById('resource');
        if (resourceDropdown) {
            resourceDropdown.innerHTML = `
                <option>Select a resource</option>
                ${this.resources.map(resource => 
                    `<option value="${resource.id}">${resource.name}</option>`
                ).join('')}
            `;
        }
    }

    getUniqueResourceTypes() {
        const types = [...new Set(this.resources.map(resource => resource.type))];
        return types.sort();
    }

    filterResourcesByType(type) {
        if (type === 'All Types') {
            return this.resources;
        }
        return this.resources.filter(resource => resource.type === type);
    }

    getAvailableResources() {
        return this.resources.filter(resource => resource.status === 'available');
    }
}
