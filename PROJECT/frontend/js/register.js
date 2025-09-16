document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registerForm');
  if (form) form.addEventListener('submit', handleRegistration);
});

function handleRegistration(e) {
  e.preventDefault();
  
  const form = e.target;
  const formData = new FormData(form);
  
  if (!validateForm(formData)) return;
  
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  
  setButtonState(submitBtn, true, 'Registering...');
  
  // Add action to form data
  formData.append('action', 'register');
  
  fetch('../backend/api.php', {
    method: 'POST',
    body: formData
  })
  .then(response => response.text())
  .then(data => {
    if (data.trim() === 'success') {
      showMessage('Registration successful! Redirecting to login...', 'success');
      setTimeout(() => window.location.href = 'index.html', 1500);
    } else {
      showMessage(data.replace('error: ', ''), 'error');
    }
  })
  .catch(() => showMessage('Connection error. Please try again.', 'error'))
  .finally(() => setButtonState(submitBtn, false, originalText));
}

// Client-side validation before sending to server
function validateForm(formData) {
  const username = formData.get('username')?.trim();
  const email = formData.get('email')?.trim();
  const password = formData.get('password');
  
  if (!username || username.length < 3) {
    showMessage('Username must be at least 3 characters long', 'error');
    return false;
  }
  
  if (!email || !isValidEmail(email)) {
    showMessage('Please enter a valid email address', 'error');
    return false;
  }
  
  if (!password || password.length < 6) {
    showMessage('Password must be at least 6 characters long', 'error');
    return false;
  }
  
  return true;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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
