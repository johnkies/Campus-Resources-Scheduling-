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
$password = $_POST['password'] ?? '';

if (empty($username) || empty($password)) {
    echo "error: Username and password are required";
    exit;
}

$db = Database::getInstance();
$user_result = $db->executeQuery("SELECT id, username, password FROM users WHERE username = ? LIMIT 1", [$username]);

if ($user_result === false) {
    error_log("Database error during login attempt for user: $username");
    echo "error: Database error. Please try again.";
    exit;
}

if (empty($user_result)) {
    echo "error: Invalid username or password";
    exit;
}

$user = $user_result[0];

// Verify password hash
if (!password_verify($password, $user['password'])) {
    echo "error: Invalid username or password";
    exit;
}

// Start session and prevent session fixation
session_start();
session_regenerate_id(true);

$_SESSION['user_id'] = $user['id'];
$_SESSION['username'] = $user['username'];
$_SESSION['logged_in'] = true;
$_SESSION['login_time'] = time();

echo "success";
?>