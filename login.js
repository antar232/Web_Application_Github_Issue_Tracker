document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;

  if (user === 'admin' && pass === 'admin123') {
    // alert('Login Successful!');
    window.location.href = "/index.html";
    // Redirect or trigger login logic here
  } else {
    alert('Invalid credentials!');
  }
});