const response = await fetch(`${baseUrl}/api/auth/login`, {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem('auth-token'),
    },
    body: JSON.stringify({ email, password }),
});
