<?php
// API endpoint router - hides backend structure
header('Content-Type: text/plain');
header('X-Content-Type-Options: nosniff');

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

// Get action from POST data
$action = $_POST['action'] ?? '';

switch ($action) {
    case 'login':
        require_once 'routes/login.php';
        break;
        
    case 'register':
        require_once 'routes/register.php';
        break;
        
    default:
        http_response_code(400);
        echo "error: Invalid action";
        exit;
}
?>
