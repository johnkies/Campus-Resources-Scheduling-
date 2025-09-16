# XAMPP Setup Guide for Campus Scheduler React App

This guide will help you deploy your React Campus Scheduler application on XAMPP server.

## 📋 Prerequisites

- XAMPP installed on your system
- Node.js installed (for building the React app)
- Your Campus Scheduler React project

## 🚀 Method 1: Deploy Built React App to XAMPP

### Step 1: Build the React Application

1. **Navigate to your project directory**
   ```bash
   cd C:/Sample
   ```

2. **Install dependencies (if not already done)**
   ```bash
   npm install
   ```

3. **Build the production version**
   ```bash
   npm run build
   ```
   This creates a `dist` folder with optimized files.

### Step 2: Deploy to XAMPP

1. **Start XAMPP Control Panel**
   - Open XAMPP Control Panel
   - Start **Apache** service

2. **Copy built files to htdocs**
   ```bash
   # Copy the entire dist folder contents to XAMPP htdocs
   xcopy "C:\Sample\dist\*" "C:\xampp\htdocs\campus-scheduler\" /E /I
   ```

3. **Access your application**
   - Open browser and go to: `http://localhost/campus-scheduler/`

## 🔧 Method 2: Proxy Development Server through XAMPP

### Step 1: Configure Vite for XAMPP

1. **Update vite.config.js**
   ```javascript
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'

   export default defineConfig({
     plugins: [react()],
     server: {
       port: 3000,
       host: '0.0.0.0', // Allow external access
       open: false
     },
     base: '/campus-scheduler/' // Set base path for XAMPP
   })
   ```

### Step 2: Create PHP Proxy (Optional)

1. **Create proxy.php in htdocs/campus-scheduler/**
   ```php
   <?php
   header('Location: http://localhost:3000');
   exit();
   ?>
   ```

2. **Access via**: `http://localhost/campus-scheduler/proxy.php`

## 🗄️ Method 3: Add Backend API with PHP/MySQL

### Step 1: Create Database

1. **Start XAMPP Services**
   - Start **Apache** and **MySQL**

2. **Create Database**
   - Go to `http://localhost/phpmyadmin/`
   - Create database: `campus_scheduler`

3. **Create Tables**
   ```sql
   CREATE TABLE resources (
       id VARCHAR(50) PRIMARY KEY,
       name VARCHAR(100) NOT NULL,
       type VARCHAR(50) NOT NULL,
       capacity INT NOT NULL,
       features TEXT,
       status VARCHAR(20) DEFAULT 'available',
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   CREATE TABLE bookings (
       id INT AUTO_INCREMENT PRIMARY KEY,
       resource_id VARCHAR(50),
       user_name VARCHAR(100) NOT NULL,
       booking_date DATE NOT NULL,
       duration VARCHAR(20) NOT NULL,
       status VARCHAR(20) DEFAULT 'confirmed',
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       FOREIGN KEY (resource_id) REFERENCES resources(id)
   );
   ```

### Step 2: Create PHP API

1. **Create api folder in htdocs/campus-scheduler/**
   ```
   htdocs/
   └── campus-scheduler/
       ├── api/
       │   ├── config.php
       │   ├── resources.php
       │   └── bookings.php
       └── (React build files)
   ```

2. **config.php**
   ```php
   <?php
   header('Content-Type: application/json');
   header('Access-Control-Allow-Origin: *');
   header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
   header('Access-Control-Allow-Headers: Content-Type');

   $servername = "localhost";
   $username = "root";
   $password = "";
   $dbname = "campus_scheduler";

   try {
       $pdo = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
       $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
   } catch(PDOException $e) {
       die("Connection failed: " . $e->getMessage());
   }
   ?>
   ```

3. **resources.php**
   ```php
   <?php
   include 'config.php';

   $method = $_SERVER['REQUEST_METHOD'];

   switch($method) {
       case 'GET':
           $stmt = $pdo->query("SELECT * FROM resources");
           $resources = $stmt->fetchAll(PDO::FETCH_ASSOC);
           echo json_encode($resources);
           break;
           
       case 'POST':
           $data = json_decode(file_get_contents('php://input'), true);
           $stmt = $pdo->prepare("INSERT INTO resources (id, name, type, capacity, features, status) VALUES (?, ?, ?, ?, ?, ?)");
           $stmt->execute([$data['id'], $data['name'], $data['type'], $data['capacity'], json_encode($data['features']), $data['status']]);
           echo json_encode(['success' => true]);
           break;
   }
   ?>
   ```

4. **bookings.php**
   ```php
   <?php
   include 'config.php';

   $method = $_SERVER['REQUEST_METHOD'];

   switch($method) {
       case 'GET':
           $stmt = $pdo->query("SELECT * FROM bookings ORDER BY created_at DESC");
           $bookings = $stmt->fetchAll(PDO::FETCH_ASSOC);
           echo json_encode($bookings);
           break;
           
       case 'POST':
           $data = json_decode(file_get_contents('php://input'), true);
           $stmt = $pdo->prepare("INSERT INTO bookings (resource_id, user_name, booking_date, duration) VALUES (?, ?, ?, ?)");
           $stmt->execute([$data['resource_id'], $data['user_name'], $data['booking_date'], $data['duration']]);
           echo json_encode(['success' => true, 'id' => $pdo->lastInsertId()]);
           break;
   }
   ?>
   ```

### Step 3: Update React App for API

1. **Create API service in React**
   ```javascript
   // src/services/api.js
   const API_BASE = 'http://localhost/campus-scheduler/api';

   export const api = {
     getResources: async () => {
       const response = await fetch(`${API_BASE}/resources.php`);
       return response.json();
     },
     
     createBooking: async (booking) => {
       const response = await fetch(`${API_BASE}/bookings.php`, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(booking)
       });
       return response.json();
     }
   };
   ```

2. **Update App.jsx to use API**
   ```javascript
   import { api } from './services/api';

   // Replace static data with API calls
   useEffect(() => {
     api.getResources().then(setResources);
   }, []);
   ```

## 📁 Final Directory Structure

```
C:\xampp\htdocs\campus-scheduler\
├── index.html              # React build output
├── assets/                 # CSS, JS bundles
├── api/                    # PHP API files
│   ├── config.php
│   ├── resources.php
│   └── bookings.php
└── uploads/                # File uploads (if needed)
```

## 🔧 Troubleshooting

### Common Issues:

1. **CORS Errors**
   - Add CORS headers in PHP files
   - Use `Access-Control-Allow-Origin: *`

2. **Database Connection Failed**
   - Check MySQL service is running
   - Verify database credentials in config.php

3. **React App Not Loading**
   - Check file permissions in htdocs
   - Verify Apache is running on port 80

4. **API Not Working**
   - Check PHP error logs in XAMPP
   - Test API endpoints directly: `http://localhost/campus-scheduler/api/resources.php`

## 🚀 Quick Start Commands

```bash
# Build React app
npm run build

# Copy to XAMPP
xcopy "dist\*" "C:\xampp\htdocs\campus-scheduler\" /E /I

# Start XAMPP services
# Open XAMPP Control Panel -> Start Apache & MySQL

# Access app
# http://localhost/campus-scheduler/
```

## 📝 Notes

- **Development**: Use `npm run dev` for development
- **Production**: Use built files in XAMPP for production
- **Database**: Use phpMyAdmin for database management
- **Logs**: Check XAMPP logs for debugging

Your Campus Scheduler React app is now ready to run on XAMPP server!
