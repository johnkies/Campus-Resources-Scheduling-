// Toast notification component
import { CONFIG } from '../config.js';
import { sanitizeHTML } from '../utils.js';

export class ToastManager {
    constructor() {
        this.container = null;
        this.init();
    }

    init() {
        this.createContainer();
    }

    createContainer() {
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.className = 'toast-container position-fixed top-0 end-0 p-3';
            this.container.style.zIndex = '1055';
            document.body.appendChild(this.container);
        }
    }

    show(message, type = CONFIG.TOAST_TYPES.INFO) {
        const toastElement = this.createToast(message, type);
        this.container.appendChild(toastElement);

        const toast = new bootstrap.Toast(toastElement, {
            autohide: true,
            delay: CONFIG.UI.TOAST_DURATION
        });

        toast.show();

        // Remove from DOM after hiding
        toastElement.addEventListener('hidden.bs.toast', () => {
            toastElement.remove();
        });

        return toast;
    }

    createToast(message, type) {
        const toastElement = document.createElement('div');
        toastElement.className = 'toast';
        toastElement.setAttribute('role', 'alert');

        const typeClasses = {
            [CONFIG.TOAST_TYPES.SUCCESS]: 'text-bg-success',
            [CONFIG.TOAST_TYPES.ERROR]: 'text-bg-danger',
            [CONFIG.TOAST_TYPES.INFO]: 'text-bg-primary',
            [CONFIG.TOAST_TYPES.WARNING]: 'text-bg-warning'
        };

        toastElement.classList.add(typeClasses[type] || typeClasses[CONFIG.TOAST_TYPES.INFO]);

        const iconMap = {
            [CONFIG.TOAST_TYPES.SUCCESS]: 'check-circle',
            [CONFIG.TOAST_TYPES.ERROR]: 'exclamation-triangle',
            [CONFIG.TOAST_TYPES.INFO]: 'info-circle',
            [CONFIG.TOAST_TYPES.WARNING]: 'exclamation-triangle'
        };

        toastElement.innerHTML = `
            <div class="toast-header">
                <i class="bi bi-${iconMap[type]} me-2"></i>
                <strong class="me-auto">${type.charAt(0).toUpperCase() + type.slice(1)}</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
            </div>
            <div class="toast-body">
                ${sanitizeHTML(message)}
            </div>
        `;

        return toastElement;
    }

    // Convenience methods
    success(message) {
        return this.show(message, CONFIG.TOAST_TYPES.SUCCESS);
    }

    error(message) {
        return this.show(message, CONFIG.TOAST_TYPES.ERROR);
    }

    info(message) {
        return this.show(message, CONFIG.TOAST_TYPES.INFO);
    }

    warning(message) {
        return this.show(message, CONFIG.TOAST_TYPES.WARNING);
    }
}

// Create singleton instance
export const toast = new ToastManager();
