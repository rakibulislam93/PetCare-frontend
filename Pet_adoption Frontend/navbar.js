fetch("navbar.html")
    .then(res => res.text())
    .then(data => {
        // Load the fetched navbar HTML into the #navbar element
        document.getElementById('navbar').innerHTML = data;

        // Now that the navbar is loaded, get the nav_element and modify it based on the token
        let navElement = document.getElementById('nav_element');
        const Authtoken = localStorage.getItem('token');
        console.log(Authtoken)
        if (navElement) { // Check if navElement exists
            if (Authtoken) {
                navElement.innerHTML += `

                    <li class="nav-item">
                        <a class="menu" href="dashboard.html" >Profile</a>
                    </li>

                    <li class="nav-item">
                        <a class="menu" onclick="handleLogout(event)">Logout</a>
                    </li>

                    
                `;
            } else {
                navElement.innerHTML += `
                    <li class="nav-item">
                        <a class="menu" href="login.html">Login</a>

                    </li>
                `;
            }
        }
    })
    .catch(error => {
        console.error("Failed to load navbar:", error);
    });
