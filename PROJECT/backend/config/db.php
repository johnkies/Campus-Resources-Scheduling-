<?php
header('X-Content-Type-Options: nosniff');

// Disable error reporting in production
if (getenv('APP_ENV') !== 'development') {
    error_reporting(0);
    ini_set('display_errors', 0);
}

/**
 * Database connection using Singleton pattern
 * Ensures single connection and uses prepared statements for security
 */
class Database {
    // Static variable to hold the single instance of the class
    private static $instance = null;
    // Private variable to store the MySQL connection object
    private $connection;
    
    private $host = 'localhost';
    private $username = 'root';
    private $password = '';
    private $database = 'system_login';
    
    // Private constructor prevents direct instantiation from outside the class
    private function __construct() {
        // Create new MySQLi connection using the parameters above
        $this->connection = new mysqli($this->host, $this->username, $this->password, $this->database);
        
        // Check if connection failed and handle the error
        if ($this->connection->connect_error) {
            // Log the actual error to server logs for debugging
            error_log("Database connection failed: " . $this->connection->connect_error);
            // Display user-friendly error message and stop execution
            die("Database connection failed");
        }
        
        // Set character encoding to UTF-8 to handle international characters properly
        $this->connection->set_charset("utf8");
    }
    
    // Static method to get the single instance of the Database class
    public static function getInstance() {
        // Check if instance doesn't exist yet
        if (self::$instance === null) {
            // Create new instance if it doesn't exist
            self::$instance = new self();
        }
        // Return the single instance
        return self::$instance;
    }
    
    // Method to get the actual MySQL connection object
    public function getConnection() {
        // Return the MySQLi connection for direct use if needed
        return $this->connection;
    }
    
    /**
     * Execute prepared statement with parameters
     * Returns results for SELECT or affected rows for INSERT/UPDATE/DELETE
     */
    public function executeQuery($sql, $params = [], $types = "") {
        // Prepare the SQL statement to prevent SQL injection
        $stmt = $this->connection->prepare($sql);
        // Check if preparation failed
        if (!$stmt) {
            // Log the error for debugging
            error_log("Prepare failed: " . $this->connection->error);
            // Return false to indicate failure
            return false;
        }
        
        // Check if parameters were provided for binding
        if (!empty($params)) {
            // If parameter types not specified, assume all are strings
            if (empty($types)) {
                // Create string of 's' characters matching parameter count
                $types = str_repeat('s', count($params));
            }
            // Bind parameters to the prepared statement
            $stmt->bind_param($types, ...$params);
        }
        
        // Execute the prepared statement
        if (!$stmt->execute()) {
            // Log execution error for debugging
            error_log("Execute failed: " . $stmt->error);
            // Close statement and return false
            $stmt->close();
            return false;
        }
        
        // Get the result set from the executed statement
        $result = $stmt->get_result();
        // Check if this was a SELECT query (returns result set)
        if ($result) {
            // Fetch all rows as associative array
            $data = $result->fetch_all(MYSQLI_ASSOC);
            // Close the statement to free resources
            $stmt->close();
            // Return the fetched data
            return $data;
        }
        
        // For INSERT/UPDATE/DELETE queries, get number of affected rows
        $affected_rows = $stmt->affected_rows;
        // Close the statement to free resources
        $stmt->close();
        // Return number of affected rows
        return $affected_rows;
    }
    
    private function __clone() {}
    private function __wakeup() {}
}

/**
 * Input validation and sanitization utilities
 */
class Validator {
    
    /**
     * Sanitize input to prevent XSS attacks
     */
    public static function sanitizeInput($input) {
        $input = trim($input);
        $input = stripslashes($input);
        $input = htmlspecialchars($input, ENT_QUOTES, 'UTF-8');
        return $input;
    }
    
    /**
     * Validate username: 3-50 chars, alphanumeric and underscores only
     */
    public static function isValidUsername($username) {
        return preg_match('/^[a-zA-Z0-9_]{3,50}$/', $username);
    }
    
    /**
     * Validate email format
     */
    public static function isValidEmail($email) {
        return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
    }
    
    /**
     * Validate password: minimum 6 characters
     */
    public static function isValidPassword($password) {
        return strlen($password) >= 6;
    }
}

// Legacy support variables for backward compatibility - will be removed in future versions
$db = Database::getInstance();      // Get singleton database instance
$conn = $db->getConnection();       // Get the actual MySQLi connection object
?>