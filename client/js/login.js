document.addEventListener('DOMContentLoaded', async function () {
    const loginForm = document.getElementById('lobby__form');
    const user = document.getElementById('username');
    const pass = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const loader = document.getElementById('loader');


    function showToast(message) {
        const toast = document.getElementById('toast');
        const toastMessage = document.querySelector('.toast-message');
        toastMessage.textContent = message;
        toast.classList.remove('hidden');
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 3000); // Hide toast after 3 seconds
    }

    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        try {

            loader.style.display = 'block';

            // Reset error messages
            passwordError.textContent = '';

            // Validate password
            if (!pass.value) {
                passwordError.textContent = 'Invalid password format';
                console.log(pass.value)
                return;
            }
            if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])(?=.*[^\w\d\s]).{7,}/.test(pass.value)) {
                passwordError.textContent = 'Invalid password format';
                console.log(pass.value)
                return;
            }

            const username = user.value;
            const password = pass.value;
            console.log(username, password);

            const response = await fetch('http://localhost:4000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            // console.log(response.body);
            if (!response.ok) {
                let errorMessage = 'Sorry our server is down';

                // Check different status codes and set appropriate error message
                if (response.status === 401) {
                    errorMessage = 'Unauthorized User';
                } else if (response.status === 402) {
                    errorMessage = 'User is not valid: Validation failed';
                } else if (response.status === 500) {
                    errorMessage = 'Internal Server Error';
                }
                console.log(errorMessage)
                return showToast(errorMessage);
            }

            const data = await response.json();
            const accessToken = data.accessToken;

            // Store the access token in local storage
            localStorage.setItem('accessToken', accessToken);

            user.value = '';
            pass.value = '';
            // Perform redirection to lobby.html
            window.location.href = 'http://localhost:4000/public/lobby.html';
        } catch (error) {
            console.error('Authentication error:', error.message);
            showToast('Internal Server Error');
            // Handle authentication error (e.g., display error message)
        } finally {
            loader.style.display = 'none';
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
