# User Authentication System

A clean, secure PHP-based user authentication system with professional code structure.

## Project Structure

```
PROJECT/
├── frontend/
│   ├── css/
│   │   └── style.css          # Styling for all pages
│   ├── js/
│   │   ├── login.js           # Login form handler
│   │   └── register.js        # Registration form handler
│   ├── index.html             # Login page
│   ├── register.html          # Registration page
│   └── dashboard.html         # User dashboard
├── backend/
│   ├── config/
│   │   └── db.php            # Database singleton & validation classes
│   └── routes/
│       ├── login.php         # Login authentication handler
│       ├── register.php      # User registration handler
│       └── logout.php        # Logout handler
└── README.md                 # This file
```

## Features

- **Professional Architecture**: Singleton pattern for database connections
- **Clean Code**: No spaghetti code, optimized structure
- **Secure Authentication**: Password hashing with PHP's `password_hash()`
- **Input Validation**: Centralized validation with Validator class
- **SQL Injection Protection**: Prepared statements with Database class
- **Session Management**: Secure session handling with regeneration
- **Modern UI**: Clean, responsive design with Bootstrap 5
- **Optimized JavaScript**: Clean, concise ES6+ code

## Database Setup

Create a MySQL database named `system_login` with the following table:

```sql
CREATE DATABASE system_login;
USE system_login;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);
```

## Configuration

Update database credentials in `backend/config/db.php` (line 11-14):
```php
$host = "localhost";
$user = "root";
$pass = "";
$db = "system_login";
```

## Architecture

### Database Class (Singleton Pattern)
- Single database connection instance
- Centralized query execution
- Automatic parameter type detection

### Validator Class (Static Methods)
- Input sanitization
- Email validation
- Username validation (alphanumeric + underscore)
- Password strength validation

### Clean JavaScript
- Modern ES6+ arrow functions
- Concise error handling
- Reusable utility functions
- No debug code or console logs

## Security Features

- Password hashing using `PASSWORD_DEFAULT` algorithm
- Session fixation protection
- Input sanitization and validation
- Prepared statements for all SQL queries
- Security headers to prevent XSS attacks
- Professional error handling

## Usage

1. Access `frontend/index.html` for login
2. Register new accounts via register page
3. Secure session-based authentication
4. Clean logout functionality

## Code Quality

- **No Spaghetti Code**: Clean, organized structure
- **Professional Standards**: PSR-compliant PHP code
- **Optimized Performance**: Singleton database connections
- **Maintainable**: Clear separation of concerns
- **Secure**: Industry-standard security practices
