document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  if (form) form.addEventListener('submit', handleLogin);
});

function handleLogin(e) {
  e.preventDefault();
  
  const form = e.target;
  const formData = new FormData(form);
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  
  setButtonState(submitBtn, true, 'Logging in...');
  
  // Add action to form data
  formData.append('action', 'login');
  
  fetch('../backend/api.php', {
    method: 'POST',
    body: formData
  })
  .then(response => response.text())
  .then(data => {
    if (data.trim() === 'success') {
      const username = formData.get('username');
      // Store session data for authentication
      sessionStorage.setItem('loggedIn', 'true');
      sessionStorage.setItem('username', username);
      
      showMessage('Login successful! Redirecting...', 'success');
      setTimeout(() => window.location.href = 'dashboard.html', 1500);
    } else {
      showMessage(data.replace('error: ', ''), 'error');
    }
  })
  .catch(() => showMessage('Connection error. Please try again.', 'error'))
  .finally(() => setButtonState(submitBtn, false, originalText));
}

function setButtonState(button, disabled, text) {
  button.disabled = disabled;
  button.textContent = text;
}

// Toast notification system
function showToast(message, type = 'success') {
  const existingToast = document.querySelector('.toast');
  if (existingToast) existingToast.remove();
  
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => toast.classList.add('show'), 100);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function showMessage(message, type) {
  showToast(message, type);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}