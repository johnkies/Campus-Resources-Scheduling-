# Campus Scheduler - React Framework

A modern React-based web application for managing campus resource bookings with dynamic components and real-time updates.

## 🚀 Features

- **Modern React Framework**: Component-based architecture with hooks
- **Dynamic Resource Management**: Real-time updates and state management
- **Responsive Design**: Bootstrap 5 integration with React components
- **Interactive Dashboard**: Live statistics and booking management
- **Component-Based Architecture**: Reusable and maintainable code structure

## 🛠 Technologies Used

- **React 18** - Modern UI framework
- **Vite** - Fast build tool and development server
- **Bootstrap 5** - CSS framework for responsive design
- **Bootstrap Icons** - Icon library
- **JavaScript ES6+** - Modern JavaScript features

## 📦 Installation

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd campus-scheduler
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production
```bash
npm run build
```

## 📁 Project Structure

```
campus-scheduler/
├── src/
│   ├── components/          # React components
│   │   ├── Navbar.jsx      # Navigation component
│   │   ├── Dashboard.jsx   # Main dashboard
│   │   ├── StatsCards.jsx  # Statistics display
│   │   ├── ResourceGrid.jsx # Resource cards grid
│   │   ├── QuickBookForm.jsx # Booking form
│   │   ├── Resources.jsx   # Resource management
│   │   ├── Bookings.jsx    # Booking history
│   │   └── Schedule.jsx    # Calendar view
│   ├── config/
│   │   └── resources.js    # Resource configuration
│   ├── App.jsx             # Main app component
│   ├── main.jsx           # React entry point
│   └── index.css          # Global styles
├── index.html             # HTML template
├── package.json           # Dependencies
├── vite.config.js         # Vite configuration
└── README.md             # This file
```

## 🎯 Usage

### Dashboard
- **Real-time Statistics**: Dynamic stats cards showing current resource status
- **Quick Booking**: Instant resource booking with form validation
- **Resource Grid**: Interactive cards with availability status

### Resources
- **Dynamic Filtering**: Filter resources by type
- **Status Management**: Real-time availability updates
- **Add Resources**: Expandable for adding new resources

### My Bookings
- **Booking History**: View all your bookings
- **Cancel Bookings**: Remove bookings with state updates
- **Status Tracking**: Real-time booking status

### Schedule
- **Weekly View**: Calendar layout for all bookings
- **Today's Schedule**: Quick view of current day
- **Navigation**: Browse different weeks

## ⚙️ Configuration

### Adding New Resources
Edit `src/config/resources.js`:

```javascript
export const DEFAULT_RESOURCES = [
  {
    id: 'unique-id',
    name: 'Lab Name',
    type: 'Lab',
    capacity: 60,
    features: ['projector', 'wifi', 'whiteboard'],
    status: 'available'
  }
]
```

### Customizing Components
Each React component is modular and can be easily customized:

- **StatsCards.jsx** - Modify statistics display
- **ResourceGrid.jsx** - Customize resource card layout
- **QuickBookForm.jsx** - Update booking form fields

## 🎨 Styling

The application uses Bootstrap 5 with custom CSS:
- **Bootstrap Classes**: Responsive grid and components
- **Custom Styles**: `src/index.css` for additional styling
- **Component Styles**: Inline styles for specific components

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Component Development
Each component follows React best practices:
- **Functional Components** with hooks
- **Props for data flow**
- **State management** with useState
- **Event handling** with proper callbacks

## 🌐 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Modern browsers with ES6+ support

## 📄 License

This project is open source and available under the MIT License.

## 🚀 Getting Started Quickly

1. **Install Node.js** from [nodejs.org](https://nodejs.org/)
2. **Run these commands**:
   ```bash
   npm install
   npm run dev
   ```
3. **Open** `http://localhost:3000` in your browser
4. **Start booking resources!**

## 🏗️ Architecture

### Folder Structure
```
campus-scheduler/
├── index.html                 # Main HTML file
├── assets/
│   ├── css/
│   │   ├── base.css          # Base styles and CSS variables
│   │   └── components.css    # Component-specific styles
│   └── js/
│       ├── app.js            # Main application entry point
│       ├── config.js         # Configuration and constants
│       ├── utils.js          # Utility functions
│       └── components/
│           ├── booking.js    # Booking management
│           ├── navigation.js # Navigation handling
│           ├── resources.js  # Resource management
│           ├── stats.js      # Statistics management
│           └── toast.js      # Toast notifications
└── README.md
```

## 🚀 Features

- **Responsive Design**: Built with Bootstrap 5 for mobile-first responsive design
- **Modular Architecture**: Clean separation of concerns with ES6 modules
- **Resource Management**: View and filter available campus resources
- **Booking System**: Quick booking form with validation
- **Real-time Stats**: Live statistics dashboard
- **Toast Notifications**: User-friendly feedback system
- **Local Storage**: Persistent data storage in browser
- **Clean UI**: Modern, professional interface

## 🛠️ Technologies

- **HTML5**: Semantic markup
- **CSS3**: Custom properties, Flexbox, Grid
- **Bootstrap 5.3**: UI framework and components
- **Bootstrap Icons**: Icon library
- **JavaScript ES6+**: Modern JavaScript with modules
- **Local Storage API**: Client-side data persistence

## 📦 Components

### Core Components

1. **StatsManager** (`assets/js/components/stats.js`)
   - Manages dashboard statistics
   - Handles data persistence
   - Updates UI counters

2. **ResourceManager** (`assets/js/components/resources.js`)
   - Manages resource data and filtering
   - Renders resource cards dynamically
   - Handles resource status updates

3. **BookingManager** (`assets/js/components/booking.js`)
   - Processes booking requests
   - Validates form data
   - Manages booking persistence

4. **NavigationManager** (`assets/js/components/navigation.js`)
   - Handles navigation interactions
   - Manages active states
   - Notification system

5. **ToastManager** (`assets/js/components/toast.js`)
   - Bootstrap toast notifications
   - Multiple notification types
   - Auto-dismiss functionality

### Utility Modules

- **Config** (`assets/js/config.js`): Application configuration and constants
- **Utils** (`assets/js/utils.js`): Shared utility functions and helpers

## 🎯 Getting Started

1. **Clone or download** the project files
2. **Open** `index.html` in a modern web browser
3. **Start using** the application immediately (no build process required)

### For Development

1. Use a local server for best experience:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js (with http-server)
   npx http-server
   ```

2. Open `http://localhost:8000` in your browser

## 🔧 Configuration

Edit `assets/js/config.js` to customize:

- API endpoints (for future backend integration)
- UI settings (toast duration, animations)
- Resource types and booking durations
- Default data and feature mappings

## 📱 Browser Support

- Chrome 61+
- Firefox 60+
- Safari 10.1+
- Edge 16+

## 🎨 Customization

### Styling
- Modify CSS variables in `assets/css/base.css`
- Add component styles in `assets/css/components.css`
- Bootstrap classes can be overridden as needed

### Functionality
- Extend components by adding new methods
- Add new components following the existing pattern
- Modify configuration in `config.js`

## 🔮 Future Enhancements

- Backend API integration
- User authentication
- Calendar view
- Email notifications
- Advanced filtering and search
- Booking conflicts detection
- Admin panel

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

Built with ❤️ using modern web technologies
