<?php
/**
 * Security utilities for rate limiting and protection
 */

class Security {
    private static $maxAttempts = 5;
    private static $lockoutTime = 900; // 15 minutes
    
    public static function checkRateLimit($identifier) {
        session_start();
        $key = 'login_attempts_' . $identifier;
        $attempts = $_SESSION[$key] ?? [];
        
        // Clean old attempts
        $attempts = array_filter($attempts, function($time) {
            return (time() - $time) < self::$lockoutTime;
        });
        
        if (count($attempts) >= self::$maxAttempts) {
            return false;
        }
        
        return true;
    }
    
    public static function recordFailedAttempt($identifier) {
        session_start();
        $key = 'login_attempts_' . $identifier;
        $_SESSION[$key][] = time();
    }
    
    public static function clearFailedAttempts($identifier) {
        session_start();
        $key = 'login_attempts_' . $identifier;
        unset($_SESSION[$key]);
    }
}
?>
