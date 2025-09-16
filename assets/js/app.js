// Main application entry point
import { NavigationManager } from './components/navigation.js';
import { ResourceManager } from './components/resources.js';
import { BookingManager } from './components/booking.js';
import { StatsManager } from './components/stats.js';
import { FilterManager } from './components/filters.js';
import { toast } from './components/toast.js';

class CampusSchedulerApp {
    constructor() {
        this.components = {};
        this.init();
    }

    async init() {
        try {
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
            } else {
                this.initializeComponents();
            }
        } catch (error) {
            console.error('Error initializing app:', error);
            toast.error('Failed to initialize application');
        }
    }

    initializeComponents() {
        try {
            // Initialize components in order
            this.components.filters = new FilterManager();
            this.components.stats = new StatsManager();
            this.components.resources = new ResourceManager();
            this.components.booking = new BookingManager(
                this.components.stats,
                this.components.resources
            );
            this.components.navigation = new NavigationManager();

            console.log('Campus Scheduler initialized successfully');
            
            // Optional: Show welcome message
            // toast.success('Welcome to Campus Scheduler!');
            
        } catch (error) {
            console.error('Error initializing components:', error);
            toast.error('Some features may not work properly');
        }
    }

    // Public API methods
    getComponent(name) {
        return this.components[name];
    }

    // Cleanup method for SPA navigation (if needed)
    destroy() {
        Object.values(this.components).forEach(component => {
            if (component.destroy && typeof component.destroy === 'function') {
                component.destroy();
            }
        });
    }
}

// Initialize the application
const app = new CampusSchedulerApp();

// Make app available globally for debugging
window.CampusScheduler = app;

export default app;
