<?php
require_once '../config/db.php';

header('X-Content-Type-Options: nosniff');
header('Content-Type: text/plain');

// Disable error display in production
if (getenv('APP_ENV') !== 'development') {
    error_reporting(0);
    ini_set('display_errors', 0);
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo "error: Method not allowed";
    exit;
}

$username = Validator::sanitizeInput($_POST['username'] ?? '');
$email = Validator::sanitizeInput($_POST['email'] ?? '');
$password = $_POST['password'] ?? '';

if (empty($username) || empty($email) || empty($password)) {
    echo "error: All fields are required";
    exit;
}

// Validate input formats
if (!Validator::isValidUsername($username)) {
    echo "error: Username must be 3-50 characters and contain only letters, numbers, and underscores";
    exit;
}

if (!Validator::isValidEmail($email)) {
    echo "error: Please enter a valid email address";
    exit;
}

if (!Validator::isValidPassword($password)) {
    echo "error: Password must be at least 6 characters long";
    exit;
}

$db = Database::getInstance();

// Check if username or email already exists
$check_result = $db->executeQuery("SELECT id FROM users WHERE username = ? OR email = ?", [$username, $email]);

if ($check_result === false) {
    error_log("Database error during user check");
    echo "error: Database error. Please try again.";
    exit;
}

if (!empty($check_result)) {
    echo "error: Username or email already exists";
    exit;
}

// Hash password and insert user
$hashed_password = password_hash($password, PASSWORD_DEFAULT);
$insert_result = $db->executeQuery("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [$username, $email, $hashed_password]);

if ($insert_result === false || $insert_result === 0) {
    error_log("Failed to insert user: $username, $email");
    echo "error: Registration failed. Please try again.";
    exit;
}

echo "success";
?>