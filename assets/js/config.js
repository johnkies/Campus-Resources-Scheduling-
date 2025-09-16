// Application configuration and constants
export const CONFIG = {
    // API endpoints (for future backend integration)
    API: {
        BASE_URL: '/api/v1',
        ENDPOINTS: {
            RESOURCES: '/resources',
            BOOKINGS: '/bookings',
            USERS: '/users',
            NOTIFICATIONS: '/notifications'
        }
    },
    
    // UI Configuration
    UI: {
        TOAST_DURATION: 3000,
        ANIMATION_DURATION: 300,
        DEBOUNCE_DELAY: 300
    },
    
    // Resource types
    RESOURCE_TYPES: [
        'All Types',
        'Laboratory',
        'Laboratory',
        'Laboratory',
        'Laboratory',
        'Laboratory'
    ],
    
    // Booking durations
    BOOKING_DURATIONS: [
        '1 hour',
        '2 hours',
        '3 hours',
        '4 hours',
        '6 hours',
        '8 hours'
    ],
    
    // Status types
    STATUS: {
        AVAILABLE: 'available',
        BOOKED: 'booked',
        MAINTENANCE: 'maintenance',
        UNAVAILABLE: 'unavailable'
    },
    
    // Toast types
    TOAST_TYPES: {
        SUCCESS: 'success',
        ERROR: 'error',
        INFO: 'info',
        WARNING: 'warning'
    }
};

// Default resource data (mock data)
export const DEFAULT_RESOURCES = [
    {
        id: 'lab-1',
        name: 'Lab 1',
        type: 'Lab',
        capacity: 60,
        features: ['projector', 'wifi', 'whiteboard'],
        status: 'available'
    },
    {
        id: 'lab-2',
        name: 'Lab 2',
        type: 'Lab',
        capacity: 60,
        features: ['computers', 'wifi', 'printer'],
        status: 'available'
    },
    {
        id: 'lab-3',
        name: 'Lab 3',
        type: 'Lab',
        capacity: 60,
        features: ['sound', 'projector', 'microphone'],
        status: 'available'
    },
    {
        id: 'lab-4-in-1',
        name: 'Lab 4 in 1',
        type: 'Lab',
        capacity: 60,
        features: ['tv', 'wifi', 'conference-phone'],
        status: 'available'
    }
];

// Feature icons mapping
export const FEATURE_ICONS = {
    'projector': 'bi-projector',
    'wifi': 'bi-wifi',
    'whiteboard': 'bi-easel',
    'computers': 'bi-pc-display',
    'printer': 'bi-printer',
    'sound': 'bi-volume-up',
    'microphone': 'bi-mic',
    'tv': 'bi-tv',
    'conference-phone': 'bi-telephone'
};
