  document.addEventListener('DOMContentLoaded', async function() {
    const loginForm = document.getElementById('lobby__form');

    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:4000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                throw new Error('Authentication failed');
            }

            const data = await response.json();
            const accessToken = data.accessToken;

            // Store the access token in local storage
            localStorage.setItem('accessToken', accessToken);

            // Perform redirection to lobby.html
            window.location.href = 'http://localhost:4000/public/lobby.html';
        } catch (error) {
            console.error('Authentication error:', error.message);
            // Handle authentication error (e.g., display error message)
        }
    });
  });

  // Add this code to include the access token in the headers of subsequent requests
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
    };

    // Example: Fetching data from a protected endpoint
    fetch('http://localhost:4000/public/lobby.html', {
        method: 'GET',
        headers: headers
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch data from protected endpoint');
        }
        // Handle successful response
    })
    .catch(error => {
        console.error('Failed to fetch data from protected endpoint:', error.message);
    });
  }
